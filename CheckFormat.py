import os
import sys
import json
import re

# Set standard variables
BACKEND = "./backend"
FRONTEND = "./frontend"
IgnoreDir: list = [".git", "node_modules"]
IgnoreFile: list = ["README.md", "config.json", ".env"]
IgnoreExtension = (".jar", ".py", ".md", ".db", ".json", ".js")
Errors = []
# Get arguments
args = sys.argv
# Remove first since it doesn't matter
del args[0]
#print(args)

def DoBackEnd():
    for subdir, dirs, files in os.walk(BACKEND):
        for file in files:
            # Ignore dirs we don't want to modify
            if not any(ext in subdir for ext in IgnoreDir):
                # Ignore files we don't want to modify
                if not any(ext in file for ext in IgnoreFile) and not file.endswith(IgnoreExtension):
                    dir = os.path.join(subdir, file)
                    print(f"Checking file: " + dir)
                    with open(dir, "rt") as a_file:
                        list_of_lines = a_file.readlines()
                        count = 0
                        # Check each line for errors perhaps? Will be working on
                        #for x in range(len(list_of_lines)):

                            # Want to avoid using else statements xd
                            #findElse = re.search("else", list_of_lines[x])
                            #if(findElse):
                            #    Errors.append(f"Found else statements in: " + dir + " in line: " + str(x+1))
                            #count = count+1
    #return

def DoFrontEnd():
    for subdir, dirs, files in os.walk(FRONTEND):
        for file in files:
            # Ignore dirs we don't want to modify
            if not any(ext in subdir for ext in IgnoreDir):
                # Ignore files we don't want to modify
                if not any(ext in file for ext in IgnoreFile) and not file.endswith(IgnoreExtension):
                    with open(os.path.join(subdir, file), "rt") as a_file:
                        list_of_lines = a_file.readlines()


if args[0] == "backend":
    DoBackEnd()
if args[0] == "frontend":
    DoFrontEnd()

if len(Errors) > 0:
    print(f"================================================================")
    print(f"ERRORS FOUND.. PRINTING THEM NOW")
    for x in Errors:
        print(x)
        continue
    print(f"================================================================")