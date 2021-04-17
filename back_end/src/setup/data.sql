-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2021 at 02:58 PM
-- Server version: 5.7.17
-- PHP Version: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `q2a`
--

--
-- Dumping data for table `blogposts`
--

INSERT INTO `blogposts` (`id`, `type`, `language`, `title`, `content`, `viewsCount`, `votesCount`, `commentsCount`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `parentId`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'POST', 'en', 'What is javascript?', '<p>The core client-side&nbsp;JavaScript language consists of some common programming features that allow you to do things like:</p><ul><li>Store useful values inside variables. In the above example for instance, we ask for a new name to be entered then store that name in a variable called <code>name</code>.</li><li>Operations on pieces of text (known as \"strings\" in programming). In the above example we take the string \"Player 1: \" and join it to the <code>name</code> variable to create the complete text label, e.g. \'\'Player 1: Chris\".</li><li>Running code in response to certain events occurring on a web page. We used a <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event\"><code>click</code></a> event in our example above to detect when the button is clicked and then run the code that updates the text label.</li><li>And much more!</li></ul><p>What is even more exciting however is the functionality built on top of the client-side JavaScript language. So-called <strong>Application Programming Interfaces</strong> (<strong>APIs</strong>) provide you with extra superpowers to use in your JavaScript code.</p><p>APIs are ready-made sets of code building blocks that allow a developer to implement programs that would otherwise be hard or impossible to implement. They do the same thing for programming that ready-made furniture kits do for home building — it is much easier to take ready-cut panels and screw them together to make a bookshelf than it is to work out the design yourself, go and find the correct wood, cut all the panels to the right size and shape, find the correct-sized screws, and <i>then</i> put them together to make a bookshelf.</p>', 0, 0, 0, 'javascript', 'php', NULL, NULL, NULL, NULL, '2021-04-17 11:27:30', '2021-04-17 11:27:30', 2),
(2, 'POST', 'en', 'Server Side Rendering with Next.js', '<p>Ever since the enormous spike in popularity of highly dynamic front-end frameworks such as React, web developers have been trying to find a balance between the interactive user experience offered by client-side rendering, and the various speed and optimization related benefits provided by server-side data rendering.</p><p>One easy way of combining these techniques to get the best of both worlds is by using <strong>Next.js,</strong> <i>a simple and flexible framework built on top of React, which allows users to utilize a wide range of features like server-side rendering, static site generation, easy file-based routing and much more!</i></p><p>In this article, we will take a look at some of its key features, along with actual code implementation, and highlight the reasons why you should use Next.js for your next web application!</p><p>&nbsp;</p><h2>CSR vs SSR, What’s the difference?</h2><p>Front end frameworks like React and Angular use <strong>Client-Side Rendering</strong> (<strong>CSR</strong>), where the server sends an almost empty HTML file to the page, followed by all the JavaScript files in one big bundle, which must then be processed in the browser to render the DOM.</p><p>In client-side rendered pages, the initial load speed is slow and the user is left staring at a blank screen until all the JavaScript is executed, and API requests have been fulfilled. However, subsequent load speeds are rapid as further changes will only need to update the relevant sections of the DOM.</p><p>The initial load speed issue in CSR can be solved by using <strong>Server-Side Rendering</strong> (<strong>SSR</strong>), wherein the server fetches information from the database and sends a prepared HTML file to the page.</p>', 0, 0, 0, 'python', 'php', 'android', NULL, NULL, NULL, '2021-04-17 11:27:30', '2021-04-17 11:27:30', 1),
(3, 'POST', 'en', 'What is React?', '<p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.</p><p>React has a few different kinds of components, but we’ll start with <code>React.Component</code> subclasses:</p><p>&nbsp;</p><p>We’ll get to the funny XML-like tags soon. We use components to tell React what we want to see on the screen. When our data changes, React will efficiently update and re-render our components.</p><p>Here, ShoppingList is a <strong>React component class</strong>, or <strong>React component type</strong>. A component takes in parameters, called <code>props</code> (short for “properties”), and returns a hierarchy of views to display via the <code>render</code> method.</p><p>The <code>render</code> method returns a <i>description</i> of what you want to see on the screen. React takes the description and displays the result. In particular, <code>render</code> returns a <strong>React element</strong>, which is a lightweight description of what to render. Most React developers use a special syntax called “JSX” which makes these structures easier to write. The <code>&lt;div /&gt;</code> syntax is transformed at build time to <code>React.createElement(\'div\')</code>. The example above is equivalent to:</p><p>&nbsp;</p><p><a href=\"https://babeljs.io/repl/#?presets=react&amp;code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA\">See full expanded version.</a></p><p>If you’re curious, <code>createElement()</code> is described in more detail in the <a href=\"https://reactjs.org/docs/react-api.html#createelement\">API reference</a>, but we won’t be using it in this tutorial. Instead, we will keep using JSX.</p><p>JSX comes with the full power of JavaScript. You can put <i>any</i> JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.</p><p>The <code>ShoppingList</code> component above only renders built-in DOM components like <code>&lt;div /&gt;</code> and <code>&lt;li /&gt;</code>. But you can compose and render custom React components too. For example, we can now refer to the whole shopping list by writing <code>&lt;ShoppingList /&gt;</code>. Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.</p><h3>&nbsp;</h3>', 0, 0, 0, 'java', 'c#', 'javascript', 'python', 'php', NULL, '2021-04-17 11:27:30', '2021-04-17 11:27:30', 1);

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `type`, `language`, `title`, `content`, `viewsCount`, `votesCount`, `answersCount`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `parentId`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'QUESTION', 'en', 'What is Next.js in the context of React? ', '<p>I am new to React and came across Next.js. Being new to React, beyond a general understanding that it\'s a software tool used many React programmers and projects I couldn\'t figure out and what specific problems of React development it helps address</p>', 0, 0, 0, 'java', 'javascript', 'html', 'next.js', NULL, NULL, '2021-04-17 11:27:30', '2021-04-17 11:27:30', 2),
(2, 'QUESTION', 'en', 'UseAsyncstorage causes infinit loop in react native', '<p>This is my code please help me in this regard. Thanks in advance.</p><p>Problem is that My component content rendering in an infinite loop.</p><pre><code class=\"language-plaintext\">const CustomDrawer =({navigation})=&gt;{\n    const [logged_in , setLoggedIn]= useState(false)\n\n    useEffect(\n        () =&gt; {\n            useAsyncStorage.getItem(\'auth_token\')\n            .then((token) =&gt; {\n                if(token){\n                    setLoggedIn(true)\n                }\n            })\n        } , []\n    )\n\n    const SignOut = ()=&gt;{\n        useAsyncStorage.removeItem(\'auth_token\')\n        .then(()=&gt;{\n            setLoggedIn(false)\n        })\n    }\n\n    return(\n        &lt;View&gt;\n            &lt;DrawerHeader username = \'Danish hello\' /&gt; // Custom drawer header\n            &lt;View style={styles.DrawerBody}&gt;\n                &lt;CustomDrawerLink name=\"Home\" iconName=\'home\' navigationScreen=\'HomeScreen\' navigation={navigation} /&gt;\n                {\n                    logged_in ?\n                    &lt;View&gt;\n                        &lt;CustomDrawerLink name=\"Profile\" iconName=\'user\'  /&gt; // Drawer custom buttons\n                        &lt;CustomDrawerLink name=\"Cart\" iconName=\'hamburger\'  /&gt;\n                    &lt;/View&gt;\n                    : undefined\n                }\n                &lt;Divider/&gt;\n                {\n                    logged_in ?\n                    &lt;TouchableOpacity style={{flexDirection:\'row\' , alignItems:\'center\'}} onPress={()=&gt;{SignOut()}} &gt;\n                        &lt;FontAwesome5 name=\'sign-out-alt\' style={{fontSize:20, marginRight:10 , color:COLORS.red_color, width:35}} /&gt;\n                        &lt;Text style={{fontSize:16 , color:\'gray\'}}&gt;Sign Out&lt;/Text&gt;\n                    &lt;/TouchableOpacity&gt;\n                    :\n                    &lt;View&gt;\n                        &lt;CustomDrawerLink name=\"Sign In\" iconName=\'sign-in-alt\'  navigationScreen=\'LoginScreen\' navigation={navigation} /&gt;\n                        &lt;CustomDrawerLink name=\"Create New Account\" iconName=\'user-plus\'  navigationScreen=\'RegisterScreen\' navigation={navigation} /&gt;\n                    &lt;/View&gt;\n                }\n\n            &lt;/View&gt;\n        &lt;/View&gt;\n    )\n}\n</code></pre><p>Please help me if anyone can solve this. or suggest me any answer regarding this</p>', 1, 0, 0, 'react.js', 'javascript', NULL, NULL, NULL, NULL, '2021-04-17 11:30:21', '2021-04-17 11:30:40', 2),
(3, 'QUESTION', 'en', 'Whats the sense of using query parameters in react?', '<p>I want to know why and when I should exactly use queryParameters. If I have a child component, that affects the state of the parent component, I can simply parse the setState method to the child component, so why do many people use queryStrings here? Writing the code to modify the query string of the url is a lot more writing than just simply calling the setState function.</p><p><br>&nbsp;</p>', 1, 0, 0, 'react.js', 'javascript', NULL, NULL, NULL, NULL, '2021-04-17 11:31:27', '2021-04-17 11:31:40', 3),
(4, 'QUESTION', 'en', 'Apply filtering to object content (value options) nodejs', '<p>I\'m trying to look through an object, and some attributes, I have limited number of values that they can be assigned to. Here\'s how I check for their value at the moment:</p><pre><code class=\"language-plaintext\">    for (const [attribute, value] of Object.entries(params.object)) {\n      if(attribute == \"accountType\")\n        if(value != \"external\" &amp;&amp; value != \"internal\") \n          return { status: `Failed! \'${attribute}\' must only equal to \'internal\' or \'external\'` };\n      else if(attribute == \"dnsName\")\n        if(value.match(\'^[a-z]*-[0-9]*$\') == null) \n          return { status: `Failed! \'${attribute}\' must follow the pattern [a-z]*-[0-9]*` };\n      else if(attribute == \"edition\")\n        if(value != \"starter\" &amp;&amp; value != \"basic\" &amp;&amp; value != \"classic\") \n          return { status: `Failed! \'${attribute}\' must only equal to \'starter\', \'basic\' or \'classic\'` };\n      else if(attribute == \"forceProvision\" || attribute == \"installSoltions\")\n        if (typeof value !== \"boolean\")\n            return { status: `Failed! \'${attribute}\' must be of type boolean true/false` };\n    }\n</code></pre><p>Is there a way to optimize this?</p>', 2, 0, 1, 'react.js', 'arrays', 'javascript', NULL, NULL, NULL, '2021-04-17 11:42:11', '2021-04-17 11:45:17', 3),
(5, 'COMMENT', 'en', NULL, '<p>For everyone\'s sanity, use braces even for single-statement <code>if</code> bodies, <strong>especially</strong> when using multiple <code>if</code> and <code>else if</code>! Javascript does not care about your indentation level</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '4', '2021-04-17 11:45:06', '2021-04-17 11:45:06', 1),
(6, 'ANSWER', 'en', NULL, '<p>You can specify a format object and do the following :</p><pre><code class=\"language-plaintext\">// the arrays represent the possible values an object respecting this format can take.\nlet format = {\n    greeting: [\'hello\', \'goodbye\'],\n    direction: [\'right\', \'left\'] \n}\n\n// here\'s a test object that does not respect said format.\nlet a = {\n    greeting: \'hello\',\n    direction: \'not a desirable value\'\n};\n\nfor(const [attribute, value] of Object.entries(a)) {\n    // - 1 on indexOf means not present in array. Here we check that the\n    // value of the attribute respects the format.\n    if(format[attribute].indexOf(value) == -1) {\n        console.log(`Incorrect format for ${attribute}, expected ${format[attribute]}`);\n    } else {\n        // saul\'goodman\n        console.log(`${attribute} correctly formatted.`);\n    }\n}\n</code></pre><p>Hope this solves your problem.</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '4', '2021-04-17 11:45:17', '2021-04-17 11:45:17', 3),
(7, 'COMMENT', 'en', NULL, '<p>What about type check or pattern matching?&nbsp;</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '6', '2021-04-17 11:45:31', '2021-04-17 11:45:31', 1),
(8, 'QUESTION', 'en', 'How to load a .graphql file using `apollo-server`?', '<p>I am currently loading the GraphQL schema using a separate <code>.graphql</code> file, but it is encapsulated within strings:</p><p><code>schema.graphql</code></p><pre><code class=\"language-plaintext\">const schema = `\n  type CourseType {\n    _id: String!\n    name: String!\n  }\n\n  type Query {\n    courseType(_id: String): CourseType\n    courseTypes: [CourseType]!\n  }\n`\n\nmodule.exports = schema\n</code></pre><p>Then using it for the <code>apollo-server</code>:</p><p><code>index.js</code></p><pre><code class=\"language-plaintext\">const { ApolloServer, makeExecutableSchema } = require(\'apollo-server\')\nconst typeDefs = require(\'./schema.graphql\')\n\nconst resolvers = { ... }\n\nconst schema = makeExecutableSchema({\n  typeDefs: typeDefs,\n  resolvers\n})\n\nconst server = new ApolloServer({\n  schema: schema\n})\n\nserver.listen().then(({ url }) =&gt; {\n  console.log(`Server ready at ${url}.`)\n})\n</code></pre><p>Is there any way to simply load a .graphql that looks as such? <code>schema.graphql</code></p><pre><code class=\"language-plaintext\">type CourseType {\n  _id: String!\n  name: String!\n}\n\ntype Query {\n  courseType(_id: String): CourseType\n  courseTypes: [CourseType]!\n}\n</code></pre><p>Then it would be parsed in the <code>index.js</code>? I noticed that <code>graphql-yoga</code> supports this, but was wondering if <code>apollo-server</code> does. I cannot find it anywhere in the docs. I can\'t get <code>fs.readFile</code> to work either.</p>', 1, 0, 4, 'apollo-client', 'node.js', 'graphql', 'javascript', NULL, NULL, '2021-04-17 11:47:00', '2021-04-17 11:48:38', 4),
(9, 'ANSWER', 'en', NULL, '<p>If you define your type definitions inside a <code>.graphql</code> file, you can read it in one of several ways:</p><p>1.) Read the file yourself:</p><pre><code class=\"language-plaintext\">const { readFileSync } = require(\'fs\')\n\n// we must convert the file Buffer to a UTF-8 string\nconst typeDefs = readFileSync(\'./type-defs.graphql\').toString(\'utf-8\')\n</code></pre><p>2.) Utilize a library like <code>graphql-tools</code> to do it for you:</p><pre><code class=\"language-plaintext\">const { loadDocuments } = require(\'@graphql-tools/load\');\nconst { GraphQLFileLoader } = require(\'@graphql-tools/graphql-file-loader\');\n\n// this can also be a glob pattern to match multiple files!\nconst typeDefs = await loadDocuments(\'./type-defs.graphql\', { \n    file, \n    loaders: [\n        new GraphQLFileLoader()\n    ]\n})\n</code></pre><p>3.) Use a <a href=\"https://github.com/detrohutt/babel-plugin-import-graphql\">babel plugin</a> or a <a href=\"https://github.com/apollographql/graphql-tag#webpack-loading-and-preprocessing\">webpack loader</a></p><pre><code class=\"language-plaintext\">import typeDefs from \'./type-defs.graphql\'</code></pre>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '8', '2021-04-17 11:47:20', '2021-04-17 11:47:20', 2),
(10, 'COMMENT', 'en', NULL, '<p>It should be noted that <code>readFileSync</code> only returns a string if you specify an encoding, eg: <code>const typeDefs = readFileSync(\'./schema.graphql\', \'utf-8\')</code>. If you do not include an encoding, it returns as a Buffer which ApolloServer\'s constructor does not understand.</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '9', '2021-04-17 11:47:43', '2021-04-17 11:47:43', 2),
(11, 'COMMENT', 'en', NULL, '<p>This is amazing! No way there\'s an equivalent <code>GraphQLFileLoader</code> method from <code>apollo-server</code>?&nbsp;</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '9', '2021-04-17 11:47:59', '2021-04-17 11:47:59', 3),
(12, 'COMMENT', 'en', NULL, '<p>Maybe in a future version.</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '9', '2021-04-17 11:48:08', '2021-04-17 11:48:08', 4),
(13, 'ANSWER', 'en', NULL, '<p>Back in the day I wrote a teeny-tiny <code>.graphql</code> loader myself. It is very small, very simple, and the only thing you have to do is import it before you try to import any <code>.graphql</code> files. I have used it ever since even though I am sure that there are some 3rd party loaders available. Here\'s the code:</p><pre><code class=\"language-plaintext\">// graphql-loader.js\n\nconst oldJSHook = require.extensions[\".js\"];\n\nconst loader = (module, filename) =&gt; {\n  const oldJSCompile = module._compile;\n  module._compile = function (code, file) {\n    code = `module.exports = \\`\\r${code}\\`;`;\n    module._compile = oldJSCompile;\n    module._compile(code, file);\n  };\n  oldJSHook(module, filename);\n};\n\nrequire.extensions[\".graphql\"] = loader;\nrequire.extensions[\".gql\"] = loader;\n</code></pre><p>And then in your app:</p><pre><code class=\"language-plaintext\">// index.js\n\nimport \"./graphql-loader\"; // (or require(\"./graphql-loader\") if you prefer)\n</code></pre><p>That\'s it, you can then <code>import typeDefs from \"./type-defs.graphql\"</code> wherever you want.</p><p>The loader works by wrapping the text in your <code>.graphql</code> file inside a template string and compiling it as a simple JS module:</p><pre><code class=\"language-plaintext\">module.exports = ` ...your gql schema... `;</code></pre>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '8', '2021-04-17 11:48:18', '2021-04-17 11:48:18', 1),
(14, 'ANSWER', 'en', NULL, '<p>This worked for me:</p><pre><code class=\"language-plaintext\">const { gql } = require(\'apollo-server\');\nconst fs = require(\'fs\');\nconst path = require(\'path\');\n\n//function that imports .graphql files\nconst importGraphQL = (file) =&gt;{\n  return fs.readFileSync(path.join(__dirname, file),\"utf-8\");\n}\n\nconst gqlWrapper = (...files)=&gt;{\n  return gql`${files}`;\n}\n\n\nconst enums = importGraphQL(\'./enums.graphql\');\nconst schema = importGraphQL(\'./schema.graphql\');\n\nmodule.exports = gqlWrapper(enums,schema);\n</code></pre>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '8', '2021-04-17 11:48:26', '2021-04-17 11:48:26', 4),
(15, 'ANSWER', 'en', NULL, '<p>Figured it out using <code>fs</code> (thanks to Tal Z):</p><p><code>index.js</code></p><pre><code class=\"language-plaintext\">const fs = require(\'fs\')\nconst mongoUtil = require(\'./mongoUtil\')\nconst { ApolloServer, makeExecutableSchema } = require(\'apollo-server\')\n\nfunction readContent (file, callback) {\n  fs.readFile(file, \'utf8\', (err, content) =&gt; {\n    if (err) return callback(err)\n    callback(null, content)\n  })\n}\n\nmongoUtil.connectToServer((error) =&gt; {\n  if (error) {\n    console.error(\'Error connecting to MongoDB.\', error.stack)\n    process.exit(1)\n  }\n\n  console.log(\'Connected to database.\')\n\n  const Query = require(\'./resolvers/Query\')\n\n  const resolvers = {\n    Query\n  }\n\n  readContent(\'./schema.graphql\', (error, content) =&gt; {\n    if (error) throw error\n\n    const schema = makeExecutableSchema({\n      typeDefs: content,\n      resolvers\n    })\n\n    const server = new ApolloServer({\n      schema: schema\n    })\n\n    server.listen().then(({ url }) =&gt; {\n      console.log(`Server ready at ${url}.`)\n    })\n  })\n})\n</code></pre><p><code>schema.graphql</code></p><pre><code class=\"language-plaintext\">type CourseType {\n  _id: String!\n  name: String!\n}\n\ntype Query {\n  courseType(_id: String): CourseType\n  courseTypes: [CourseType]!\n}</code></pre>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '8', '2021-04-17 11:48:38', '2021-04-17 11:48:38', 4),
(16, 'QUESTION', 'en', 'Mysql docker container keeps restarting', '<p>The Container keeps restarting. I tried</p><ul><li>docker-compose down -v</li><li>docker volume rm</li></ul><blockquote><p>The container was working fine until my pc got accidentally shutdown.</p></blockquote><h3>Logs</h3><pre><code class=\"language-plaintext\">2021-03-27 13:16:08+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.23-1debian10 started.\n\n2021-03-27 13:16:08+00:00 [Note] [Entrypoint]: Switching to dedicated user \'mysql\'\n\n2021-03-27 13:16:08+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.23-1debian10 started.\n\n2021-03-27 13:16:08+00:00 [ERROR] [Entrypoint]: MYSQL_USER=\"root\", MYSQL_USER and MYSQL_PASSWORD are for configuring a regular user and cannot be used for the root user\n\nRemove MYSQL_USER=\"root\" and use one of the following to control the root user password:\n\n- MYSQL_ROOT_PASSWORD\n\n- MYSQL_ALLOW_EMPTY_PASSWORD\n\n- MYSQL_RANDOM_ROOT_PASSWORD\n</code></pre><h3>Docker-compose.yml</h3><pre><code class=\"language-plaintext\"> mysql:\n    image: mysql:8.0\n    ports:\n      - 3306:3306\n    expose:\n      - \"3306\"\n    cap_add:\n      - SYS_NICE # CAP_SYS_NICE\n    volumes:\n      - ./cache/mysql:/var/lib/mysql\n      - ./conf-mysql.cnf:/etc/mysql/conf.d/mysql.cnf\n    environment:\n      - MYSQL_ROOT_PASSWORD=root\n      - MYSQL_PASSWORD=root\n      - MYSQL_USER=root\n      - MYSQL_DATABASE=mydb\n    restart: unless-stopped</code></pre>', 1, 0, 3, 'mysql', 'docker', 'yaml', NULL, NULL, NULL, '2021-04-17 11:50:35', '2021-04-17 11:51:59', 4),
(17, 'COMMENT', 'en', NULL, '<p>try change <code>MYSQL_USER=root</code> to <code>MYSQL_ROOT_USER=root</code></p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:50:57', '2021-04-17 11:50:57', 2),
(18, 'COMMENT', 'en', NULL, '<p>I already tried that it didn\'t work&nbsp;</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:51:04', '2021-04-17 11:51:04', 1),
(19, 'COMMENT', 'en', NULL, '<p>Your error message is clearly points to <code>MYSQL_PASSWORD</code> and <code>MYSQL_USER</code> which should not be used&nbsp;</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:51:12', '2021-04-17 11:51:12', 3),
(20, 'ANSWER', 'en', NULL, '<p>Simply remove the <code>MYSQL_USER</code> and it will work fine because the <code>root</code> user gets created automatically.</p><p><i>PS. This seems to be a problem with a newer docker version because this used to work before and not throw an error.</i></p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:51:34', '2021-04-17 11:51:34', 3),
(21, 'ANSWER', 'en', NULL, '<p>User <code>root</code> is reserved and already created with mysql when it\'s up.</p><p><code>MYSQL_USER</code> must be a different name, not <code>root</code>.</p>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:51:44', '2021-04-17 11:51:44', 2),
(22, 'ANSWER', 'en', NULL, '<p>I faced the exact same problem and here is how I fixed it.</p><p>Go to your docker-compose.yml file and make the following changes:</p><p>\"MYSQL_USER: root\" to \"MYSQL_ROOT_USER: root\" then delete the previous one.</p><p>\"MYSQL_PASSWORD: YourPasseord\" to \"MYSQL_ROOT_PASSWORD: YourPasseord\" then delete the previous one.</p><p>Example:Here is my configuration...</p><p>database_server:</p><p>&nbsp;</p><pre><code class=\"language-plaintext\">image: mysql:8.0\n       container_name: mysql\n       restart: always\n       environment:\n         MYSQL_DATABASE: DB_epraca\n         MYSQL_ROOT_USER: root\n         MYSQL_ROOT_PASSWORD: Password\n         MYSQL_ROOT_HOST: localhost</code></pre>', 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '16', '2021-04-17 11:51:59', '2021-04-17 11:51:59', 1);

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `title`, `content`, `language`, `used`, `createdAt`, `updatedAt`) VALUES
(1, 'react.js', 'React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.', 'en', 3, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(2, 'javascript', 'JavaScript (a dialect of ECMAScript) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed, and interpreted language traditionally used for client-side scripting in web browsers. JavaScript can also be run outside of the browser with the use of a framework like Node.js, Nashorn, Wakanda, or Google Apps Script. Despite the name, it is unrelated to the Java programming language and shares only superficial similarities.\n', 'en', 5, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(3, 'html', 'HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser. Questions regarding HTML should include a minimal reproducible example and some idea of what you\'re trying to achieve. This tag is rarely used alone and is often paired with [CSS] and [javascript].', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(4, 'arrays', 'An array is an ordered linear data structure consisting of a collection of elements (values, variables, or references), each identified by one or more indexes. When asking about specific variants of arrays, use these related tags instead: [vector], [arraylist], [matrix]. When using this tag, in a question that is specific to a programming language, tag the question with the programming language being used.', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(5, 'node.js', 'Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google\'s V8 JavaScript engine and libuv library. It is used for developing applications that make heavy use of the ability to run JavaScript both on the client, as well as on server side and therefore benefit from the re-usability of code and the lack of context switching.', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(6, 'mysql', 'MySQL is a free, open source Relational Database Management System (RDBMS) that uses Structured Query Language (SQL)', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(7, 'orm', 'Object-relational mapping (ORM) is a technique for mapping object-oriented systems to relational databases.', 'en', 0, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(8, 'object', 'An object is any entity that can be manipulated by commands in a programming language. An object can be a value, a variable, a function, or a complex data-structure. In object-oriented programming, an object refers to an instance of a class.', 'en', 0, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(9, 'express', 'Express is a minimal and flexible Node.js web application framework providing a robust set of features for building web applications.', 'en', 0, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(10, 'graphql', 'GraphQL is an API technology designed to describe the complex, nested data dependencies of modern web applications. It is often considered an alternative to SOAP or REST', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(11, 'sequelize.js', 'The Sequelize library provides an ORM (Object-Relational-Mapper) for Node.js, written entirely in JavaScript. Provides easy mapping for MySQL, MariaDB, SQLite, PostgreSQL and SQL Server.', 'en', 0, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(12, 'apollo-client', 'Apollo Client is a JavaScript library for building client UIs that fetch data using GraphQL.', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(13, 'next.js', 'Next.js is a minimalistic framework for server-rendered React applications.', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(14, 'docker', 'Docker is a tool to build and run containers. ', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(15, 'yaml', 'YAML (/ˈjæməl/, rhymes with camel) is a human-readable data serialization language that takes concepts from programming languages such as C, Perl, and Python, and ideas from XML and the data format of electronic mail (RFC 2822). YAML was first proposed by Clark Evans in 2001, who designed it together with Ingy döt Net and Oren Ben-Kiki. It is available for several programming languages.', 'en', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30'),
(16, 'جاوااسکریپت', '', 'fa', 1, '2021-04-17 11:27:30', '2021-04-17 11:27:30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
