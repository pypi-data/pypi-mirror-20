"""
    This file is part of Picopore.

    Picopore is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Picopore is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Picopore.  If not, see <http://www.gnu.org/licenses/>.
"""
import subprocess
import numpy as np
import h5py
import os
from numpy.lib.recfunctions import drop_fields, append_fields
from shutil import copyfile

from util import log, isGroup, getDtype, findDatasets, rewriteDataset, recursiveCollapseGroups, uncollapseGroups

__basegroup_name__ = "Picopore"

def chooseCompressFunc(args):
	if args.revert:
		if args.mode == 'lossless':
			func = losslessDecompress
			name = "Performing lossless decompression "
		elif 'deep-lossless':
			func = deepLosslessDecompress
			name = "Performing deep lossless decompression "
		else:
			log("Unable to revert raw files. Please use a basecaller instead.")
			exit(1)
	else:
		if args.mode == 'lossless':
			func = losslessCompress
			name = "Performing lossless compression "
		elif args.mode == 'deep-lossless':
			func = deepLosslessCompress
			name = "Performing deep lossless compression "
		elif args.mode == 'raw':
			func = rawCompress
			name = "Performing raw compression "
	try:
		log(name, end='')
	except NameError:
		log("No shrinking method selected")
		exit(1)
	return func

def deepLosslessCompress(f, group):
	paths = findDatasets(f, group, "Events")
	paths = [path for path in paths if "Basecall" in path]
	# index event detection
	sampleRate = f["UniqueGlobalKey/channel_id"].attrs["sampling_rate"]
	for path in paths:
		if f[path].parent.parent.attrs.__contains__("event_detection"):
			# index back to event detection
			dataset = f[path].value
			start = [int(round(sampleRate * i)) for i in dataset["start"]]
			move = dataset["move"]
			# otherwise, event by event
			dataset = drop_fields(dataset, ["mean", "stdv", "start", "length", "move"])
			dataset = append_fields(dataset, ["start", "move"], [start, move], [getDtype(start), getDtype(move)])
			rewriteDataset(f, path, compression="gzip", compression_opts=9, dataset=dataset)
	# remove group hierarchy
	f.create_group(__basegroup_name__)
	for name, group in f.items():
		if name != __basegroup_name__:
			recursiveCollapseGroups(f, __basegroup_name__, name, group)
	return losslessCompress(f, group)

def deepLosslessDecompress(f, group):
	# rebuild group hierarchy
	if __basegroup_name__ in f.keys():
		uncollapseGroups(f, f[__basegroup_name__])	
	paths = findDatasets(f, group)
	paths = [path for path in paths if "Basecall" in path]
	sampleRate = f["UniqueGlobalKey/channel_id"].attrs["sampling_rate"]
	for path in paths:
		if f[path].parent.parent.attrs.__contains__("event_detection"):
			# index back to event detection
			dataset = f[path].value
			if "mean" not in dataset.dtype.names:
				eventDetectionPath = f[path].parent.parent.attrs.get("event_detection")
				eventData = f[findDatasets(f, "all", entry_point=eventDetectionPath)[0]]
				start = dataset["start"][0]
				end = dataset["start"][-1]
				# constrain to range in basecall
				eventData = eventData[np.logical_and(eventData["start"] >= start, eventData["start"] <= end)]
				# remove missing events
				i=0
				keepIndex = []
				for time in dataset["start"]:
					while eventData["start"][i] != time and i < eventData.shape[0]:
						i += 1
					keepIndex.append(i)
				eventData = eventData[keepIndex]
				dataset = drop_fields(dataset, "start")
				start = [i/sampleRate for i in eventData["start"]]
				length = [i/sampleRate for i in eventData["length"]]
				dataset = append_fields(dataset, ["mean", "start", "stdv", "length"], [eventData["mean"], start, eventData["stdv"], length])	
				rewriteDataset(f, path, dataset=dataset)
	return losslessDecompress(f, group)

def losslessCompress(f, group):
	paths = findDatasets(f, group, keyword="Events")
	paths.extend(findDatasets(f, group, keyword="Alignment"))
	paths.extend(findDatasets(f, "all", keyword="Signal", entry_point="Raw"))
	for path in paths:
		rewriteDataset(f, path, "gzip", 9)
	return "GZIP=9"
		
def losslessDecompress(f, group):
	paths = findDatasets(f, group, keyword="Events")
	paths.extend(findDatasets(f, group, keyword="Alignment"))
	paths.extend(findDatasets(f, "all", keyword="Signal", entry_point="Raw"))
	for path in paths:
		rewriteDataset(f, path)
	return "GZIP=1"
		
def rawCompress(f, group):
	paths = findDatasets(f, group, keyword="Events")
	paths.extend(findDatasets(f, group, keyword="Alignment"))
	paths.extend(findDatasets(f, group, keyword="Log"))
	paths.extend(findDatasets(f, group, keyword="Configuration"))
	paths.extend(findDatasets(f, group, keyword="HairpinAlign"))
	paths.extend(findDatasets(f, group, keyword="Summary")) # TODO: does poretools use summary?
	paths.extend(findDatasets(f, group, keyword="Calibration_Strand"))
	paths.extend(findDatasets(f, group, keyword="Hairpin_Split"))
	paths.extend(findDatasets(f, group, keyword="EventDetection"))
	for path in paths:
		try:
			del f[path]
		except KeyError:
			# duplicated in paths, already deleted
			pass
	return "GZIP=9"

def compress(func, filename, group="all", prefix=None):
	if prefix is not None:
		newFilename = os.path.join(os.path.dirname(filename), ".".join([prefix, os.path.basename(filename)]))
		copyfile(filename, newFilename)
		filename = newFilename
	with h5py.File(filename, 'r+') as f:
		filtr = func(f, group)
	subprocess.call(["h5repack","-f",filtr,filename,"{}.tmp".format(filename)])
	subprocess.Popen(["mv","{}.tmp".format(filename),filename])

def compressWrapper(args):
	return compress(*args)
