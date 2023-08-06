#!/usr/bin/env cwlrunner
cwlVersion: cwl:v1.0
class: CommandLineTool
baseCommand: ["python", "-m", "nlppln.commands.liwc"]
arguments:
  - valueFrom: $(runtime.outdir)/
    position: 4

inputs:
- id: meta_in
  type: File
  inputBinding:
    position: 1
- id: in_files
  type:
    type: array
    items: File
  inputBinding:
    position: 2

outputs:
- id: metadata_out
  type: File
  outputBinding:
    glob: ""
