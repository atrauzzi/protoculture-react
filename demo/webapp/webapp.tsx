import "protoculture/lib/Shims";
import * as React from "react";
import { ReactServiceProvider, ReactAppConfiguration } from "../../src/index";
import { ServiceProvider, StaticServiceProvider, BaseApp, Bundle, WebServiceProvider } from "protoculture";
import * as Hapi from "hapi";


// tslint:disable:max-classes-per-file

class ReactDemoComponent extends React.Component<any, any> {

    public state = {
        count: 0,
    };

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
        </div>;
    }

    protected increment() {

        this.setState({
            count: ++this.state.count
        });
    }
}

class ReactDemoWebAppServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureReactApp({
            id: "demo",
            component: ReactDemoComponent,
        });
    }
}

//
// Here's a suite that acts as the composition root for the entire solution.
class ReactDemoWebAppSuite extends Bundle {

    public name = "react-demo";

    protected get serviceProviders(): StaticServiceProvider<any>[] {

        return [
            ReactServiceProvider,
            ReactDemoWebAppServiceProvider,
            WebServiceProvider,
        ];
    }
}

//
// And this is how we start it!
const suite = new ReactDemoWebAppSuite();
suite.run().catch(console.error);
