import bcrypt from 'bcrypt';
import { ROLE, LANGUAGE } from '../constants.js';

const getUsersData = async () => {
  return [
    {
      publicName: process.env.SUPER_ADMIN_USERNAME,
      profileImage: 'q2a_admin.png',
      about: 'Some descriptions about q2a_admin',
      theme: 'light',
      role: ROLE.SUPER_ADMIN,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
      isEmailVerified: true,
    },
    {
      publicName: 'demo1',
      profileImage: 'q2a_demo1.png',
      about: 'Some descriptions about demo1 user',
      theme: 'light',
      role: ROLE.USER_CONFIRMED,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: 'demo1@gmail.com',
      password: await bcrypt.hash('demo1_password', 10),
      isEmailVerified: true,
    },
    {
      publicName: 'demo2',
      profileImage: 'q2a_demo2.png',
      about: 'Some descriptions about demo2 user',
      theme: 'dark',
      role: ROLE.USER_CONFIRMED,
      score: 0,
      language: LANGUAGE.ENGLISH,
      email: 'demo2@gmail.com',
      password: await bcrypt.hash('demo2_password', 10),
      isEmailVerified: true,
    },
  ];
};

const getTagsData = async () => {
  return [
    {
      title: 'javascript',
      content:
        'JavaScript (/ˈdʒɑːvəˌskrɪpt/),[8] often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.[9] JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.',
      used: 1,
      language: LANGUAGE.ENGLISH,
    },
    {
      title: 'next.js',
      content:
        'Next.js is an open-source React front-end development web framework that enables functionality such as server-side rendering and generating static websites for React based web applications. It is a production-ready framework that allows developers to quickly create static and dynamic JAMstack websites and is used widely by many large companies.',
      used: 1,
      language: LANGUAGE.ENGLISH,
    },
    {
      title: 'programming',
      content: 'Programming is some sort of moder art.',
      used: 1,
      language: LANGUAGE.ENGLISH,
    },
    {
      title: 'javascript',
      content: 'زبان برنامه نویسی جاوااسکریپت',
      used: 1,
      language: LANGUAGE.PERSIAN,
    },
  ];
};

const getQuestionsData = async () => {
  return [
    {
      type: 'QUESTION',
      language: LANGUAGE.ENGLISH,
      title: 'What is Next.js in the context of React? ',
      content:
        "<p>I am new to React and came across Next.js. Being new to React, beyond a general understanding that it's a software tool used many React programmers and projects I couldn't figure out and what specific problems of React development it helps address</p>",
      viewsCount: 0,
      votesCount: 0,
      answersCount: 0,
      userId: 1,
      tag1: 'javascript',
      tag2: 'next.js',
    },
  ];
};

const getBlogPostsData = async () => {
  return [
    {
      type: 'POST',
      language: LANGUAGE.ENGLISH,
      title: 'What is javascript?',
      content: `<p>The core client-side&nbsp;JavaScript language consists of some common programming features that allow you to do things like:</p><ul><li>Store useful values inside variables. In the above example for instance, we ask for a new name to be entered then store that name in a variable called <code>name</code>.</li><li>Operations on pieces of text (known as "strings" in programming). In the above example we take the string "Player 1: " and join it to the <code>name</code> variable to create the complete text label, e.g. ''Player 1: Chris".</li><li>Running code in response to certain events occurring on a web page. We used a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event"><code>click</code></a> event in our example above to detect when the button is clicked and then run the code that updates the text label.</li><li>And much more!</li></ul><p>What is even more exciting however is the functionality built on top of the client-side JavaScript language. So-called <strong>Application Programming Interfaces</strong> (<strong>APIs</strong>) provide you with extra superpowers to use in your JavaScript code.</p><p>APIs are ready-made sets of code building blocks that allow a developer to implement programs that would otherwise be hard or impossible to implement. They do the same thing for programming that ready-made furniture kits do for home building — it is much easier to take ready-cut panels and screw them together to make a bookshelf than it is to work out the design yourself, go and find the correct wood, cut all the panels to the right size and shape, find the correct-sized screws, and <i>then</i> put them together to make a bookshelf.</p>`,
      viewsCount: 0,
      votesCount: 0,
      commentsCount: 0,
      userId: 1,
      tag1: 'programming',
      tag2: 'javascript',
    },
    {
      type: 'POST',
      language: LANGUAGE.ENGLISH,
      title: 'Server Side Rendering with Next.js',
      content: `<p>Ever since the enormous spike in popularity of highly dynamic front-end frameworks such as React, web developers have been trying to find a balance between the interactive user experience offered by client-side rendering, and the various speed and optimization related benefits provided by server-side data rendering.</p><p>One easy way of combining these techniques to get the best of both worlds is by using <strong>Next.js,</strong> <i>a simple and flexible framework built on top of React, which allows users to utilize a wide range of features like server-side rendering, static site generation, easy file-based routing and much more!</i></p><p>In this article, we will take a look at some of its key features, along with actual code implementation, and highlight the reasons why you should use Next.js for your next web application!</p><p>&nbsp;</p><h2>CSR vs SSR, What’s the difference?</h2><p>Front end frameworks like React and Angular use <strong>Client-Side Rendering</strong> (<strong>CSR</strong>), where the server sends an almost empty HTML file to the page, followed by all the JavaScript files in one big bundle, which must then be processed in the browser to render the DOM.</p><p>In client-side rendered pages, the initial load speed is slow and the user is left staring at a blank screen until all the JavaScript is executed, and API requests have been fulfilled. However, subsequent load speeds are rapid as further changes will only need to update the relevant sections of the DOM.</p><p>The initial load speed issue in CSR can be solved by using <strong>Server-Side Rendering</strong> (<strong>SSR</strong>), wherein the server fetches information from the database and sends a prepared HTML file to the page.</p>`,
      viewsCount: 0,
      votesCount: 0,
      commentsCount: 0,
      userId: 1,
      tag1: 'next.js',
      tag2: 'javascript',
    },
    {
      type: 'POST',
      language: LANGUAGE.ENGLISH,
      title: 'What is React?',
      content: `<p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.</p><p>React has a few different kinds of components, but we’ll start with <code>React.Component</code> subclasses:</p><p>&nbsp;</p><p>We’ll get to the funny XML-like tags soon. We use components to tell React what we want to see on the screen. When our data changes, React will efficiently update and re-render our components.</p><p>Here, ShoppingList is a <strong>React component class</strong>, or <strong>React component type</strong>. A component takes in parameters, called <code>props</code> (short for “properties”), and returns a hierarchy of views to display via the <code>render</code> method.</p><p>The <code>render</code> method returns a <i>description</i> of what you want to see on the screen. React takes the description and displays the result. In particular, <code>render</code> returns a <strong>React element</strong>, which is a lightweight description of what to render. Most React developers use a special syntax called “JSX” which makes these structures easier to write. The <code>&lt;div /&gt;</code> syntax is transformed at build time to <code>React.createElement('div')</code>. The example above is equivalent to:</p><p>&nbsp;</p><p><a href="https://babeljs.io/repl/#?presets=react&amp;code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA">See full expanded version.</a></p><p>If you’re curious, <code>createElement()</code> is described in more detail in the <a href="https://reactjs.org/docs/react-api.html#createelement">API reference</a>, but we won’t be using it in this tutorial. Instead, we will keep using JSX.</p><p>JSX comes with the full power of JavaScript. You can put <i>any</i> JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.</p><p>The <code>ShoppingList</code> component above only renders built-in DOM components like <code>&lt;div /&gt;</code> and <code>&lt;li /&gt;</code>. But you can compose and render custom React components too. For example, we can now refer to the whole shopping list by writing <code>&lt;ShoppingList /&gt;</code>. Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.</p><h3>&nbsp;</h3>`,
      viewsCount: 0,
      votesCount: 0,
      commentsCount: 0,
      userId: 1,
      tag1: 'react.js',
      tag2: 'javascript',
    },
  ];
};

export { getUsersData, getTagsData, getBlogPostsData, getQuestionsData };
