import * as React from "react";


export interface ReactAppConfiguration<Props> {

    id?: string;

    class?: string;

    component: React.ComponentClass<Props>;
}
