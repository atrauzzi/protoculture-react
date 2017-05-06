import * as _ from "lodash";
import * as React from "react";
import * as ReactDom from "react-dom";
import { App, Suite, domReady } from "protoculture";
import { Store } from "redux";
import { Provider } from "react-redux";
import { ReactAppConfiguration } from "./ReactAppConfiguration";


export class ReactApp implements App {
    
    public get name() {

        const name = this.configuration.id
            || this.configuration.class
            || "react";
        
        return _.kebabCase(name);
    }

    public get working() {

        return true;
    }

    public suite: Suite;
    
    public constructor(
        protected store: Store<any>,
        protected configuration: ReactAppConfiguration<any>,
    ) {

    }

    public async run() {

        await domReady();

        const domRoots = this.findDomElements();

        this.runComponents(domRoots);
    }

    protected runComponents(elements: Element[]) {

        _.each(elements, (element) => this.runComponent(element))
    }

    protected runComponent(element: Element) {

        const Component = this.configuration.component;

        const component = <Provider store={this.store}>
            <Component />
        </Provider>

        ReactDom.render(component, element);
    }

    protected findDomElements(): Element[] {

        if(this.configuration.id) {

            return [document.getElementById(this.configuration.id)];
        }
        else if(this.configuration.class) {

            return Array.from(document.getElementsByClassName(this.configuration.class));
        }

        return [];
    }
}