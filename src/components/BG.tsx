import './BG.css'

function BG(props: { mode: string }) {
    let topMode: string = `top ${props.mode}`
    let bottomMode: string = `bottom ${props.mode}`
    return (
        <div className='div'>
            <div className={topMode}>
            </div>
            <div className={bottomMode}>
            </div>
        </div>
    )
}

export default BG