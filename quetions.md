1. What is the difference between Component and PureComponent? Give an example where it might break my app.

    A component in react is basically a fundamental unit of block to create reusable UI's.
    We can define components in two ways-
    1. Class Components->  These are just JS classes that extends React.Component class. We have a render function inside a class which returns a React element
    2. Functional Components-> These are similar to JS functions which takes props as argumants and return us a React element.

    In a normal Component, React re-renders the component when it recieves new prop or state, also re renders its children even if the data is not actually changed.

    eg. -
        class ChildComponent extends Component{
        render(){
            console.log("Re-render")
            return ""
        }
        };

        class ParentComponent extends Component{
        constructor(props) {
            super(props);
            this.state = {
            count: 0
            }
        }

        render(){
            return (
                <div>
                    <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    {this.state.count}
                    </button>
                    <ChildComponent />
                </div>
            );
        }
        };

    In the above example, initial count value is 0.
    If I click on the button it increments count value by 1 and re-renders parent on every button click. Similary child will also get re-rendered,but it does not need to.
    This leads to unnecessary re-renders and is not good for app's performance.

    PureComponent -> It is a React class which when used does shallow comparison of the component's props & states. If it does not encounter any changes in the props or states it doesn't re- render the component.
    This helps in preventing unnecessary re-renders & improves performance.

    In the above example if we make ChildComponent as Pure, we will be able to prevent re-renders

    class ChildComponent extends PureComponent{
        render(){
            console.log("Re-render")
            return ""
        }
        };

    --> Scenarios where it might break my app is when the props passed to the component contain complex data structures such as objects or arrays. Since PureComponent performs only shallow rendering, it will not detect changes in the deeply nested objects.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
    If a component uses shouldComponentUpdate to optimize re-renders but also consumes context, it may still re-render unnecessarily whenever the context value changes, even if the component's props or state haven't changed. And unnecessary re-renders will lead to performance degradation.

3. Describe 3 ways to pass information from a component to its PARENT.

   3 ways to pass information from a component to it's parent -
   --> One way is to use prop and callback function. 
   A parent component passes a function as a prop to its child and then child will call this function with information whenever an event occurs.
   --> Using Context API
   It will help us pass data to the required component without passing it through each level.
   For ex. to pass info to parent using context api-
   We can create a context in Parent component and pass this context value to it's child. Child can access this value using useContext hook or a consumer and will update the context value based on the changes. And Parent can access this context value.
   --> Using redux or any other state management library
   We can have a central store. Child will dispatch actions to update store and Parent can subscribe to the changes in store.

4. Give 2 ways to prevent components from re-rendering.

    Using PureComponents in class based components.
    Using React.memo in functional components.

    Both performs shallow comparison of the components's prop and state to determine if a component should re render or not.
    For primitive types such as strings and numbers-
    Shallow comparison checks the prev values with the current value of prop and state.
    For non-primitive types such as objects & arrays-
    Shallow comparison checks the reference of current and previous prop and state.


5. What is a fragment and why do we need it? Give an example where it might break my app.

     A fragment lets us group multiple elements without adding extra nodes to the DOM.
    --> Implement it using <React.Fragment></React.Fragment> or <></>

    For example-

    const Example=()=>{
        return(
            <>
                <span>This is Kiran</span>
                <span>I live in Bangalore</span>
            </>
        )
    }
    Example where it might break my app-
    --> Using certain CSS or JavaScript selectors that rely on a specific DOM structure.
    eg-

    div > p {
        /* Styles for paragraphs inside a div */
        }

    So here if I have a component that uses fragments to render multiple <p> elements inside a <div>, it will break the CSS selector because fragments don't create additional DOM nodes


6. Give 3 examples of the HOC pattern.

    Example 1- HOC to render a component with an extra prop

    function SimpleComponent(props) {
        return <div>{props.message}</div>;
    }
    function withExtraProp(WrappedComponent) {
    return function EnhancedComponent(props) {
        return <WrappedComponent {...props} extraProp="I'm an extra prop!" />;
    };
    }
    const EnhancedComponent = withExtraProp(SimpleComponent);

    <EnhancedComponent message="Hello world" />

    Example 2- HOC to toggle a feature-

    function withFeatureToggle(WrappedComponent, featureEnabled){
        return function(props){
            return featureEnabled ? <WrappedComponent {...props} /> : <></>;
        }
    }
    const NewFeatureComp = () => {
        return (
            <div>
                <button>New Feature</button>
            </div>
        );
        };


    const enableNewFeatures = false;

    const NewFeatureCompWithFeatureToggle = withFeatureToggle( NewFeatureComp, enableNewFeatures );

    Example 3- HOC that adds the style objects to the component that we pass to it

        function withStyles(Component) {
            return props => {
                const style = { padding: '10px', margin: '5px' }
                return <Component style={style} {...props} />
            }
            }

    const Button = () = <button>Click me!</button>

    const StyledButton = withStyles(Button)


7. What's the difference in handling exceptions in promises, callbacks and async...await?

    In promises .then and .catch is used to handle success and error scenarios. Error thrown in promise chain is caught by 
    .catch. Promised are chainable which helps in more concise error handling.
    eg.-
    
    fetchData()
    .then((data) => {
        // Success handler
        console.log(data);
    })
    .catch((error) => {
        // Error handler
        console.error(error);
    });

    In callbacks functions are passed as arguments to handle success and error conditions. Error handling is done through the first argument of the callback function.
    It can lead to callback hell which makes our code hard to read and maintain

    function asyncTask(cb){
        setTimeout(cb,0)
    }
    asyncTask((err,data)=>{
        if(err){
            throw err;
        }
        esle{
            console.log(data)
        }
    })
   

    In asyn await we use try and catch blocks to handle exceptions. 
    await keyword is used to wait for the resolution of a promise, and any errors thrown in the async function are caught by the surrounding try & catch block.

    async function fetchData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    }


8. How many arguments does setState take and why is it async.

    setState can take 2 arguments-
    1. function to update the state
    2. A callback, which will be called once the state has been updated and component has re-rendered.

    It is async because of performance reasons. Making it synchronous will lead to browser unresponsiveness.
    React basically batches multiple updates together and executes them asynchronously. Batching helps in minimizing re-renders. Multiple state updates are combined into a single update which can optimize performance.


9. List the steps needed to migrate a Class to Function Component.
   1. Converting states to hooks. Handling state updates using hooks
   2. Converting lifecycle methods to useEffect and taking care of dependencies and cleanup functions
   3. Converting class methods to functions
   4. Remove this keyword in functional components
   5. Remove render function from functional components. Functional components just returns JSX directly.
   6. Remove any unused class related code
   7. Test and refactor
   8. Updating tests
   9. Monitoring the component

10. List a few ways styles can be used with components.
    -> Inline styles 
       We pass an object of style in the style attribute and render it inside the component.
    -> Normal CSS
       We create external CSS file for each component and import it in required component.
    -> CSS in JS
       It helps to write CSS with JS. We can manage styles dynamically based on props and state.
    -> Sass 
       It is a CSS preprocessor that extends CSS with features like variables, nesting, mixins etc
    -> Global stylesheets- Can be imported in the root and access all over the project.


11. How to render an HTML string coming from the server.
    Rendering an HTML string directly from the server can introduce security risks.
    We can use the dangerouslySetInnerHTML attribute. But we should sanitize the string (using libraries like DOMPurify) before inserting it, otherwise it will lead to cross-site scripting (XSS) attack.

    eg.
    const MyComponent = ({ htmlStr }) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlStr }}
    };

    Other way is to use libraries like react-html-parser to convert html strings to react elements.
