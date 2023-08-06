
Install:
	pip install kiwilite

Usage:
	import kiwilite

	with kiwilite.Open('<path-to-db-file>') as storage:

		# Set map data of key and value and save storage file.
		storage.Set({'<key>': '<value>'})

		# Get value bytes of key.
		<value> = storage.Get('<key>')

		# Log: a list of timestones.
		[<list>, <of>, <timestones>] = storage.Log(<start-timestamp>, <end-timestamp>)

		# Rollback to the last timestone before timestamp,
		# and clear all data after timestamp.
		storage.Rollback(<timestamp>)

		# Lighten to the first timestone after timestamp,
		# and clear all invalid data before timestamp.
		# Data will not lose, but cannot rollback before timestamp.
		storage.Lighten(<timestamp>)
