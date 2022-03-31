import "./Paginated.css"

export default function Paginated ({dogsShowing,paginated,cardsPerPage,next}){
    const pageNumbers = []
    for (let i = 1; i < Math.ceil(dogsShowing/cardsPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <div className="containerPaginated">
                {pageNumbers?.map(n => <button key={n}className="btn" onClick={e => paginated(n)}>{n}</button> )}
        </div>
    )
}