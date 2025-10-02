"use client";

import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import TodoList from "./todos/TodoList";

export default function Lab3() {
    // Log to console for debugging demonstration
    console.log('Lab 3 Component Loaded!');

    return (
        <div id="wd-lab3" className="container">
            <h2 className="mb-4">Lab 3 - Creating Single Page Applications with React</h2>

            {/* Section 3.2: Introduction to JavaScript */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">JavaScript Fundamentals</h3>

                {/* Variables and Constants */}
                <VariablesAndConstants />

                {/* Variable Types */}
                <VariableTypes />

                {/* Boolean Variables */}
                <BooleanVariables />

                {/* Conditionals */}
                <IfElse />
                <TernaryOperator />

                {/* Conditional Output */}
                <ConditionalOutputIfElse />
                <ConditionalOutputInline />
            </section>

            {/* Section 3.3: JavaScript Functions */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">JavaScript Functions</h3>

                {/* Legacy Functions */}
                <LegacyFunctions />

                {/* Arrow Functions */}
                <ArrowFunctions />

                {/* Implied Returns */}
                <ImpliedReturn />

                {/* Template Literals */}
                <TemplateLiterals />
            </section>

            {/* Section 3.4: JavaScript Data Structures */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">JavaScript Data Structures</h3>

                {/* Arrays */}
                <SimpleArrays />
                <ArrayIndexAndLength />
                <AddingAndRemovingToFromArrays />

                {/* Array Operations */}
                <ForLoops />
                <MapFunction />
                <FindFunction />
                <FindIndex />
                <FilterFunction />

                {/* JSON */}
                <JsonStringify />
                <House />

                {/* Advanced Operations */}
                <Spreading />
                <Destructing />
                <FunctionDestructing />
                <DestructingImports />
            </section>

            {/* Section 3.5: Dynamic Styling */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Dynamic Styling</h3>

                {/* Classes and Styles */}
                <Classes />
                <Styles />
            </section>

            {/* Section 3.6: Parameterizing Components */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Parameterizing Components</h3>

                {/* Component Parameters */}
                <Add a={3} b={4} />

                {/* Child Components */}
                <div className="mb-3">
                    <h4>Square of 4</h4>
                    <Square>4</Square>
                </div>

                {/* Highlight Component */}
                <div className="mb-3">
                    <Highlight>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
                    </Highlight>
                </div>

                {/* Path Parameters */}
                <PathParameters />
            </section>

            {/* Section 3.7: Todo List Application */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Todo List Application</h3>
                <TodoList />
            </section>

            {/* Navigation Links */}
            <div className="mt-5 p-3 bg-info bg-opacity-10 rounded">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/Labs">Back to Labs Index</a></li>
                    <li><a href="/">Kambaz Application</a></li>
                    <li><a href="https://github.com/yourusername/kambaz-react">GitHub Repository</a></li>
                </ul>
            </div>
        </div>
    );
}