import re

tts = """

"""
# Write this generally to get more data out of ssoft
def length_regexp():
    tts_list = []

    pattern = re.compile(r'length-\d\d\d\d\d')
    matches = pattern.finditer(tts)
    for match in re.finditer(pattern, tts):
        s = match.start()
        e = match.end()
        tts_list.append(tts[s:e])
        tts_list = list(dict.fromkeys(tts_list))
    for l in tts_list:
        print(l)

length_regexp()