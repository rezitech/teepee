Teepee
======

Teepee is a templating language for JavaScript, ideal for creating websites, webapps, or anything else - quickly.  Teepee is stable, small, fast, and even lets you control the syntax (and all of this in 745 bytes).


How to use Teepee
-----------------

Teepee syntax is both easy to use, and completely customizable.  By default, Teepee's syntax is like that of [Mustache][mustache], another absolutely fantastic markup language (which is itself based on [CTemplate][ctemplate]).

	<script src="tpl.js"></script>
	<script>
	var t = new Tpl();
	t.render('Hello, {{$a}}!', {a:'World'});
	</script>

You can change Teepee's syntax to your heart's content.

	<script src="tpl.js"></script>
	<script>
	var t = new Tpl();
	t.openingBracket('@');
	t.closingBracket('@');
	t.printingBracket('=');
	t.render('Hello, @=a@!', {a:'World'});
	</script>


Installation
------------

To use Teepee, include this script anywhere in your page.  You can even hotlink to the latest Teepee.

	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>


Contributing
------------

1. Fork it.
2. Create a branch (`git checkout -b my_teepee`)
3. Commit your changes (`git commit -am "Added Awesomeness"`)
4. Push to the branch (`git push origin my_teepee`)
5. Create an [Issue][1] with a link to your branch
6. Enjoy a refreshing Diet Coke and wait

[1]: //github.com/rezitech/teepee/issues
[mustache]: //mustache.github.com/
[ctemplate]: //code.google.com/p/google-ctemplate/