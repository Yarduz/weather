import { useState } from 'react'
import './SearchBar.css'

function SearchBar(props: any) {

    const [saver, setSaver] = useState("")

    function save(event: any) {
        console.log(event.target.value)
        setSaver(event.target.value)
    }

    function clicked() {
        props.searchHandler(saver)
    }

    return (
        <div className='SearchBar'>
            <input onChange={save} placeholder='please search for the city you want to see' type="text" />
            <button type='button' onClick={clicked}>search</button>
        </div>
    )
}

export default SearchBar