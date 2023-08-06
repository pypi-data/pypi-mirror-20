import unicodedata
from difflib import SequenceMatcher as _SequenceMatcher
from heapq import nlargest as _nlargest

def strip_accents(s):
	return ''.join(c for c in unicodedata.normalize('NFD', s)
					if unicodedata.category(c) != 'Mn')

def supercasefold(s):
	return strip_accents(s).casefold()
	
	
	
	
	
def case_insensitive_close_matches(word, possibilities, n=3, cutoff=0.6, excpt=None):
    """Use SequenceMatcher to return list of the best "good enough" matches.

    word is a sequence for which close matches are desired (typically a
    string).

    possibilities is a list of sequences against which to match word
    (typically a list of strings).

    Optional arg n (default 3) is the maximum number of close matches to
    return.  n must be > 0.

    Optional arg cutoff (default 0.6) is a float in [0, 1].  Possibilities
    that don't score at least that similar to word are ignored.

    The best (no more than n) matches among the possibilities are returned
    in a list, sorted by similarity score, most similar first.

    >>> get_close_matches("appel", ["ape", "apple", "peach", "puppy"])
    ['apple', 'ape']
    >>> import keyword as _keyword
    >>> get_close_matches("wheel", _keyword.kwlist)
    ['while']
    >>> get_close_matches("Apple", _keyword.kwlist)
    []
    >>> get_close_matches("accept", _keyword.kwlist)
    ['except']
    """

    if not n >  0:
        raise ValueError("n must be > 0: %r" % (n,))
    if not 0.0 <= cutoff <= 1.0:
        raise ValueError("cutoff must be in [0.0, 1.0]: %r" % (cutoff,))
    result = []
    s = _SequenceMatcher()
    s.set_seq2(supercasefold(word))
    for x in possibilities:
        x_ = supercasefold(x)
        s.set_seq1(x_)
        if s.real_quick_ratio() >= cutoff and \
           s.quick_ratio() >= cutoff and \
           s.ratio() >= cutoff:
            result.append((s.ratio(), x))

    # Move the best scorers to head of list
    result = _nlargest(n, result)
    # Strip scores for the best n matches
    ret = [x for score, x in result]
    if not excpt is None:
        did_you_mean = "'{}' not found, did you mean {}?".format(word, " or ".join("'{}'".format(s) for s in ret))
        raise excpt(did_you_mean)
    return ret


def max_len(arg, at_least=0):
	if len(arg)==0:
		return at_least
	try:
		return max(at_least, *map(len,arg))
	except:
		try:
			return max(at_least, *map(len,*arg))
		except:
			print("ERR max_len")
			print("arg=",arg)
			print("type(arg)=",type(arg))
			raise

def grid_str(arg, lineprefix="", linesuffix=""):
	x = []
	try:
		n = 0
		while 1:
			x.append(max_len(tuple(i[n] for i in arg)))
			n += 1
	except IndexError:
		n -= 1
	lines = [ lineprefix+" ".join(t[i].ljust(x[i]) for i in range(len(t)))+linesuffix for t in arg ]
	return '\n'.join(lines)



