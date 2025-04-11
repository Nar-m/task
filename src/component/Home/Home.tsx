import Form from "./Form"
import Acardion from "./Acardion"
import './home.css';
import React, { useState, useEffect, useRef } from "react";
import data from "../data.json";

export interface questionsInterface {
    question: string,
    answer1: string,
    answer2: string
}

type Event = React.ChangeEvent<HTMLInputElement | null>

export default function Home() {
    const [inputFocus, setInputFocos] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const ref = useRef<HTMLDivElement | null>(null);

    const [dataQuestions, setDataQuestions] = useState<questionsInterface[]>(() => {
        const storage = localStorage.getItem('dataQuestions')
        return storage ? JSON.parse(storage) : data
    })
    const onBlur = () => setInputFocos(false);

    const handleBlur = (event: React.MouseEvent<HTMLDivElement | null>) => {
        if (inputFocus && ref.current && !ref.current.contains(event.target as Node)) {
            console.log(true)
            onBlur()
        }
    }
    const toggleAnsver = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }
    const handleInputChange = (event: Event) => {
        const { value } = event.target
        setSearchInput(value)
        if (value.length > 0) {
            const filterQuestions = dataQuestions.filter((element) => {
                return element.question.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
                    || element.answer1.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
                    || element.answer2.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            })
            setDataQuestions(filterQuestions)
        }
        else {
            setDataQuestions(data)
        }
    }
    useEffect(() => {
        localStorage.setItem('dataQuestions', JSON.stringify(dataQuestions));
    }, [dataQuestions]);
    return (
        <div onClick={handleBlur}>
            <div className="home-conteiner d-flex align-items-center justify-content-center flex-column w-100">
                <Form
                    ref={ref}
                    input={searchInput}
                    focus={inputFocus}
                    onFocus={() => setInputFocos(true)}
                    onBlur={onBlur}
                    onChange={handleInputChange} />
                <div className="d-flex align-items-center flex-column w-100">
                    {dataQuestions?.map((element, index) => {
                        return (
                            <Acardion
                                element={element}
                                activeIndex={activeIndex === index}
                                index={index}
                                toggleAnsver={toggleAnsver}
                                key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}