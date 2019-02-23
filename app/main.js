
// Import for side effects - we have to import this first so that the polyfills will
// be available for the rest of the code.
// --
// NOTE: I would normally include this as an Entry bundle; but, I couldn't get the
// HtmlWebpackPlugin to work properly if I did that (since I don't think it could
// implicitly determine the dependency order). In the future, I might be able to make
// this more dynamic (ie, use Webpack's import() syntax).
import "./main.polyfill";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Import core classes.
import Vue from "vue";
import VueRouter from "vue-router";

// Import application classes.
import AppComponent from "./app.component.vue";
import CountdownComponent from "./countdown.component.vue";
import HomeComponent from "./home.component.vue";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes = [
	{
		path: "/",
		component: HomeComponent
	},
	{
		path: "/countdown/:utcTarget",
		component: CountdownComponent
	},
	{
		path: "*",
		redirect: "/"
	}
];

var router = new VueRouter({
	routes: routes
});

Vue.use( VueRouter );

new Vue({
	el: "my-app",
	router: router,

	// I render the root component of the application into the DOM.
	render: ( createElement ) => {

		return( createElement( AppComponent ) );

	}
});
