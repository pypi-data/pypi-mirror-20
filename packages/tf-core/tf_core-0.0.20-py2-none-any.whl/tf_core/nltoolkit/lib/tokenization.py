import nltk
from django.conf import settings

from tf_core.annotation import Annotation
from tf_core.nltoolkit.helpers import TreebankWordTokenizer, NltkRegexpTokenizer, TextTilingTokenizer, \
    StanfordTokenizer


def tokenizer_hub(input_dict):
    """
    Apply the *tokenizer* object on the Annotated Document Corpus (*adc*):

    1. first select only annotations of type *input_annotation*,
    2. apply the tokenizer
    3. create new annotations *output_annotation* with the outputs of the tokenizer.

    :param adc: Annotated Document Corpus (workflows.textflows.DocumentCorpus)
    :param tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    :param input_annotation: Which annotated part of document to be splitted.
    :param output_annotation: How to annotate the newly discovered tokens.

    :returns adc: Annotated Document Corpus (workflows.textflows.DocumentCorpus)
    """
    tokenizer_dict = input_dict['tokenizer']

    if type(tokenizer_dict)!=dict:
        from workflows.tasks import executeFunction
        from tf_latino.latino.library_gen import latino_tokenize_words

        return latino_tokenize_words(input_dict) if not settings.USE_WINDOWS_QUEUE \
            else executeFunction.apply_async([latino_tokenize_words,input_dict],queue="windows").wait()
    else:
        tokenizer=tokenizer_dict['object']
        args=tokenizer_dict.get('args',[])
        kwargs=tokenizer_dict.get('kargs',{})
        input_annotation = input_dict['input_annotation']
        output_annotation = input_dict['output_annotation']
        adc = input_dict['adc']
        docs_count=len(adc.documents)
        for i,document in enumerate(adc.documents):
            if document.features['contentType'] == "Text":
                if not document.text:
                    pass
                for annotation,subtext in document.get_annotations_with_text(input_annotation): #all annotations of this type
                    new_token_spans=tokenizer.span_tokenize(subtext,*args,**kwargs)
                    for starts_at,ends_at in new_token_spans:
                        document.annotations.append(Annotation(annotation.span_start+starts_at,annotation.span_start+ends_at-1,output_annotation))
            if i%100==0:
                print int((i+1)*1.0/docs_count*100)
            #widget.progress = int((i+1)*1.0/*100)
            #widget.save()
        return {'adc': adc}


def nltk_treebank_word_tokenizer(input_dict):
    """
    The Treebank tokenizer uses regular expressions to tokenize text as in Penn Treebank.
    This is the method that is invoked by ``word_tokenize()``.  It assumes that the
    text has already been segmented into sentences, e.g. using ``sent_tokenize()``.

    This tokenizer performs the following steps:
    - split standard contractions, e.g. ``don't`` -> ``do n't`` and ``they'll`` -> ``they 'll``
    - treat most punctuation characters as separate tokens
    - split off commas and single quotes, when followed by whitespace
    - separate periods that appear at the end of line

    :param input_dict (default): {}
    :returns tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """


    return {'tokenizer': {'object': TreebankWordTokenizer()}}


def nltk_punkt_sentence_tokenizer(input_dict):
    """
    A sentence tokenizer which uses an unsupervised algorithm to build
    a model for abbreviation words, collocations, and words that start
    sentences; and then uses that model to find sentence boundaries.
    This approach has been shown to work well for many European
    languages.

    :param input_dict (default): {}
    :returns tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    return {'tokenizer': {'object': nltk.PunktSentenceTokenizer()}}


def nltk_regex_tokenizer(input_dict):
    """
    The Regex Tokenizer splits a string into substrings using a regular expression.

    :param :param pattern: The pattern used to build this tokenizer.
        (This pattern may safely contain capturing parentheses.)
    :param gaps: True if this tokenizer's pattern should be used
        to find separators between tokens; False if this
        tokenizer's pattern should be used to find the tokens
        themselves.
    :param discard_empty: True if any empty tokens `''`
        generated by the tokenizer should be discarded.  Empty
        tokens can only be generated if `_gaps == True`.

    :param input_dict (default): {u'pattern': u'\\p{L}+(-\\p{L}+)*', u'gaps': u'', u'discard_empty': u''}
    :return: tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    pattern = input_dict[u'pattern']
    gaps = input_dict[u'gaps'] == "true"
    discard_empty = input_dict[u'discard_empty'] == "true"

    return {'tokenizer': {'object': NltkRegexpTokenizer(pattern, gaps=gaps, discard_empty=discard_empty)}}


def nltk_sexpression_tokenizer(input_dict):
    """
    A tokenizer that divides strings into s-expressions.
    An s-expresion can be either:
      - a parenthesized expression, including any nested parenthesized
        expressions, or
      - a sequence of non-whitespace non-parenthesis characters.

    :param input_dict (default): {u'parens': u'()', u'strict': u'true'}
    :param parens: A two-element sequence specifying the open and close parentheses
        that should be used to find sexprs.  This will typically be either a
        two-character string, or a list of two strings.
    :param strict: If true, then raise an exception when tokenizing an ill-formed sexpr.

    :return: tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    parens = input_dict[u'parens']
    strict = input_dict[u'strict'] == "true"

    return {'tokenizer': {'object': nltk.SExprTokenizer(parens=parens, strict=strict)}}


def nltk_simple_tokenizer(input_dict):
    """
    These tokenizers divide strings into substrings using the string
    ``split()`` method.
    When tokenizing using a particular delimiter string, use
    the string ``split()`` method directly, as this is more efficient.

    Space Tokenizer - Tokenize a string using the space character as a delimiter, which is the same as s.split(' ').
    Tab Tokenizer - Tokenize a string use the tab character as a delimiter, the same as s.split('\t').
    Char Tokenizer - Tokenize a string into individual characters.
    Whitespace Tokenizer - Tokenize a string on whitespace (space, tab, newline).
    Blankline Tokenizer - Tokenize a string, treating any sequence of blank lines as a delimiter. Blank lines are defined as lines containing no characters, except for space or tab characters.
    Word Punct Tokenizer - Tokenize a text into a sequence of alphabetic and non-alphabetic characters, using the regexp ``\w+|[^\w\s]+``.

    :param input_dict (default): {u'type': u'wordpunct_tokenizer'}
    :param (type unicode) u"char_tokenizer"
    :param (type unicode) u"space_tokenizer"
    :param (type unicode) u"tab_tokenizer"
    :param (type unicode) u"whitespace_tokenizer"
    :param (type unicode) u"blankline_tokenizer"
    :param (type unicode) u"wordpunct__tokenizer"

    :return: tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    if input_dict["type"] == u"char_tokenizer":
        tokenizer = nltk.tokenize.simple.CharTokenizer()
    elif input_dict["type"] == u"space_tokenizer":
        tokenizer = nltk.SpaceTokenizer()
    elif input_dict["type"] == u"tab_tokenizer":
        tokenizer = nltk.TabTokenizer()
    elif input_dict["type"] == u"whitespace_tokenizer":
        tokenizer = nltk.WhitespaceTokenizer()
    elif input_dict["type"] == u"blankline_tokenizer":
        tokenizer = nltk.BlanklineTokenizer()
    elif input_dict["type"] == u"wordpunct_tokenizer":
        tokenizer = nltk.WordPunctTokenizer()

    return {'tokenizer': {'object': tokenizer}}


def nltk_line_tokenizer(input_dict):
    """
    Tokenize a string into its lines, optionally discarding blank lines.
    This is similar to ``s.split('\n')``

    :param input_dict (default): {u'blanklines': u'discard'}
    :param blanklines: 'discard', 'keep', 'discard-eof'
    :return: tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    blanklines = input_dict[u"blanklines"]
    return {'tokenizer': {'object': nltk.LineTokenizer(blanklines=blanklines)}}


def nltk_stanford_tokenizer(input_dict):
    """
    Stanford Tokenizer

    :param input_dict (default): {}
    :return: tokenizer: A python dictionary containing the Tokenizer object and its arguments.
    """

    return {'tokenizer': {'object': StanfordTokenizer()}}


def nltk_text_tiling_tokenizer(input_dict):
    """
    Tokenize a document into topical sections using the TextTiling algorithm.
    This algorithm detects subtopic shifts based on the analysis of lexical
    co-occurrence patterns.


    :param input_dict (default): {u'smoothing_rounds': u'1', u'k': u'10', u'smoothing_width': u'2', u'stopwords': u'None', u'similarity_method': u'BLOCK_COMPARISON', u'w': u'20', u'cutoff_policy': u'HC'}
    :param w: Pseudosentence size
    :type w: int
    :param k: Size (in sentences) of the block used in the block comparison method
    :type k: int
    :param similarity_method: The method used for determining similarity scores:
       `BLOCK_COMPARISON` (default) or `VOCABULARY_INTRODUCTION`.
    :type similarity_method: constant
    :param stopwords: A list of stopwords that are filtered out (defaults to NLTK's stopwords corpus)
    :type stopwords: list(str)
    :param smoothing_width: The width of the window used by the smoothing method
    :type smoothing_width: int
    :param smoothing_rounds: The number of smoothing passes
    :type smoothing_rounds: int
    :param cutoff_policy: The policy used to determine the number of boundaries:
      `HC` (default) or `LC`
    :type cutoff_policy: constant
    """

    w = int(input_dict["w"])
    k = int(input_dict["k"])
    similarity_method = input_dict["similarity_method"]
    stopwords = None if input_dict["stopwords"] == "None" else [word.strip() for word in input_dict["stopwords"].split(",")]
    smoothing_width = int(input_dict["smoothing_width"])
    smoothing_rounds = int(input_dict["smoothing_rounds"])
    cutoff_policy = input_dict["cutoff_policy"]

    return {'tokenizer': {  'object': TextTilingTokenizer(w=w,
                                                          k=k,
                                                          similarity_method = similarity_method,
                                                          stopwords=stopwords,
                                                          smoothing_width=smoothing_width,
                                                          smoothing_rounds=smoothing_rounds,
                                                          cutoff_policy=cutoff_policy)}}




























