tts = ''
import re
def regexp_general(pattern, tts_input, duplicates=None):
    tts_list = []
    tts = tts_input
    p = re.compile(pattern)
    for match in re.finditer(p, tts):
        s = match.start()
        e = match.end()
        tts_list.append(tts[s:e])
        if duplicates:
            tts_list = list(dict.fromkeys(tts_list))
    for l in tts_list:
        print(l)
    return tts_list


regexp_general(r'length-\d\d\d\d\d', tts)