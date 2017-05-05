import * as React from "react";
import { ReactServiceProvider, ReactAppConfiguration } from "../../src/index";
import { ServiceProvider, StaticServiceProvider, BaseApp, Suite, WebServiceProvider } from "protoculture";
import * as Hapi from "hapi";


class ReactDemoComponent extends React.Component<any, any> {

    public state = {
        count: 0,
    }

    public render() {

        return <div>
            <h1>React Demo Component!</h1>

            <button
                onClick={() => this.increment()}
            >
                🎆
            </button>

            {
                this.state.count
                    ? <p>{this.state.count}</p>
                    : <p>You haven't clicked yet!</p>
            }

            {
                this.state.count
                    ? <p>There, now wasn't that satisfying?</p>
                    : null
            }
        </div>
    }

    protected increment() {

        this.setState({
            count: ++this.state.count
        });
    }
}

class ReactDemoWebAppServiceProvider extends ReactServiceProvider {

    public async boot() {

        this.bindReactApp({
            id: "demo",
            component: ReactDemoComponent,
        });

        super.boot();
    }
}

//
// Here's a suite that acts as the composition root for the entire solution.
class ReactDemoWebAppSuite extends Suite {

    public name = "react-demo";

    protected get serviceProviders(): StaticServiceProvider<any>[] {

        return [
            ReactDemoWebAppServiceProvider,
            WebServiceProvider,
        ];
    }
}

//
// And this is how we start it!
const suite = new ReactDemoWebAppSuite();
suite.run().catch(console.error);
