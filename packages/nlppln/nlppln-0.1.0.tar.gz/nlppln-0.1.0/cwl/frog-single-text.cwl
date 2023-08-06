#!/usr/bin/env cwl-runner
cwlVersion: cwl:v1.0
class: CommandLineTool
baseCommand: frog
arguments: ["-o", $(inputs.in_file.nameroot).out]
hints:
  - class: DockerRequirement
    dockerPull: proycon/lamachine
inputs:
  in_file:
    type: File
    inputBinding:
      position: 1
      prefix: -t
outputs:
  frogout:
    type: File
    outputBinding:
      glob: "$(inputs.in_file.nameroot).out"
