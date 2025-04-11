import React, { forwardRef } from "react"

type Event = React.ChangeEvent<HTMLInputElement | null>

type divElement = HTMLDivElement | null;

interface input {
    input: string
    focus: boolean
    onFocus: () => void
    onChange: (event: Event) => void
    onBlur: () => void
}

const Form = forwardRef<divElement, input>((props: input, ref) => {
    const { onBlur, onFocus, onChange, input, focus } = props
    const handleFocus = () => {
        if (focus) return;
        onFocus()
    }
    return (
        <div className="input-conteiner mb-5">
            <div ref={ref} className="search-conteiner position-relative text-capitalize">
                <input
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    value={input}
                    id="search"
                    className="search-input" type="text" />
                <label onClick={handleFocus} className={`${focus || input.length > 0 ? 'placholder top' : 'placholder'}`}>search...</label>
            </div>
        </div>
    )
})

export default React.memo(Form)
