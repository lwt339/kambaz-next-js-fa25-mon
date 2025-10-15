"use client";

import WorkingWithLocation from "./WorkingWithLocation";

import { useSelector } from "react-redux";
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
import Link from "next/link";
import {ListGroup, ListGroupItem} from "react-bootstrap";

interface Todo {
    id: string;
    title: string;
}

interface RootState {
    todosReducer: {
        todos: Todo[];
    };
}

export default function Lab3() {

    console.log('Hello World!');
    const { todos } = useSelector((state: RootState) => state.todosReducer);

    return (
        <div id="wd-lab3" className="container">
            <WorkingWithLocation />
            <h2 className="mb-4">Lab 3 - Creating Single Page Applications with React</h2>

            <ListGroup>
                {todos.map((todo: Todo) => (
                    <ListGroupItem key={todo.id}>
                        {todo.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />


            {/* Introduction to JavaScript */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">JavaScript </h3>

                {/* Variables and Constants */}
                <VariablesAndConstants />

                {/* Variable Types */}
                <VariableTypes />

                {/* Boolean Variables */}
                <BooleanVariables />

                {/* Conditionals */}
                <IfElse />
                <TernaryOperator />


                <ConditionalOutputIfElse />
                <ConditionalOutputInline />
            </section>

            {/* JavaScript Functions */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">JavaScript Functions</h3>


                <LegacyFunctions />


                <ArrowFunctions />


                <ImpliedReturn />


                <TemplateLiterals />
            </section>

            {/* JavaScript Data Structures */}
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
            </section>

                {/* Todo List Application */}
                <section className="mb-5 p-4 border rounded bg-light">
                    <h3 className="text-primary">Todo List Application</h3>
                    <TodoList />
                </section>

                {/* Operations */}
            <section className="mb-5 p-4 border rounded bg-light">
                <Spreading />
                <Destructing />
                <FunctionDestructing />
                <DestructingImports />
            </section>

            {/* Dynamic Styling */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Dynamic Styling</h3>


                <Classes />
                <Styles />
            </section>

            {/* Parameterizing Components */}
            <section className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Parameterizing Components</h3>


                <Add a={3} b={4} />


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



            {/* Navigation Links */}
            <div className="mt-5 p-3 bg-info bg-opacity-10 rounded">
                <h4>Quick Links</h4>
                <ul>
                    <li><Link href="/Labs">Back to Labs Index</Link></li>
                    <li><Link href="/">Kambaz Application</Link></li>
                    <li><Link href="https://github.com/lwt339/kambaz-next-js-fa25-mon">GitHub Repository</Link></li>
                </ul>
            </div>
        </div>
    );
}