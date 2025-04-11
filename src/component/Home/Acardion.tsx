import React, { useRef, useState, useEffect } from "react"
import { questionsInterface } from "./Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

interface data {
    element: questionsInterface
    activeIndex: boolean
    index: number
    toggleAnsver: (index: number) => void
}

const Acardion = ({ activeIndex, index, element, toggleAnsver }: data) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");

    useEffect(() => {
        if (activeIndex && ref.current) {
            const scrollHeight = ref.current.scrollHeight;
            setMaxHeight(`${scrollHeight}px`);
        } else {
            setMaxHeight("0px");
        }
    }, [activeIndex]);

    return (
        <div className="mb-3 acardion-questions-item" key={index}>
            <div onClick={() => toggleAnsver(index)}
                className="acardion-top overflow-hidden w-100 d-flex align-items-center justify-content-between p-4">
                <div className="acardion-question-title">
                    <h1>{element.question}</h1>
                </div>
                <div className="acardion-chevron-icon">
                    <button style={{
                        transform: `rotate(${activeIndex ? '180deg' : '0deg'})`
                    }} type="button" className="btns-chevron transition-transform duration-30">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
            <div ref={ref}
                style={{
                    maxHeight: maxHeight,
                }}
                className={`accordion-answer ${activeIndex ? "open" : ""}`}>
                <p className="text1">{element.answer1}</p>
                <p className="text2">{element.answer2}</p>
            </div>
        </div>
    )
}

export default React.memo(Acardion)