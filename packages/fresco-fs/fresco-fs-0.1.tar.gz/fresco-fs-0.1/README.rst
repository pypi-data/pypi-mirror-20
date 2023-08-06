fresco-fs: filesystem resources for the fresco framework
========================================================

fresco-fs provides a flexible framework to load and serve
content from a filesystem directory, integrated with
`the fresco web framework <https://ollycope.com/software/fresco/>`.

This package was developed for the
`Skot.be kot listings site <https://skot.be/>`,
where it is used to serve some of the site's static content.

Example:

.. code:: python

    from fresco import FrescoApp
    from fresco_fs import FSResources
    import markdown


    def serve_markdown(path):
        """ Take a path to a .md file and turn it into an HTML response """
        with open(path, 'r', encoding='utf-8') as f:
            return Response(markdown.markdown(f.read()))

    pages = FSResources(

            search_path=['path/to/content/files/'],

            # Each of extension will be added to the request filename in
            # turn until one matches. So a request for '/mypage' would try
            # '/mypage.md' then '/mypage.txt'.
            # (Note that a request for '/mypage.txt' would be translated into
            #  '/mypage.txt.md' and '/mypage.txt.txt'.)
            search_extensions=['.md', '.txt'],

            # A function taking a mapped path and returning a fresco Response.
            responder=serve_markdown,

            # The route name to use. Routes can be generated with
            # `urlfor('pages', path='mypage')`
            route_name='pages')

    app = FrescoApp()
    app.include('/', pages)



FSResources allows paths to be rewritten on ingress by passing a ``rewriter``
function to the constructor. This function must take the requested path
and return zero or more rewritten paths. Each rewritten path is then tested
in order, and the first existing path is served.

For example to serve different content depending on language, you could write a
function like this:

.. code:: python

    def try_i18n_paths(virtualpath):
        lang = get_active_language()
        return ['{}.{}'.format(virtualpath, lang), virtualpath]

The FSResources constructor would then look like this:

.. code:: python

    pages = FSResources(
            search_path=['path/to/content/files/'],
            search_extensions=['.md', '.txt'],
            responder=serve_markdown,
            rewriter=try_i18n_paths)




