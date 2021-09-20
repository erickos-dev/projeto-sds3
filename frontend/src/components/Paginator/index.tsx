import { SalePage } from "types/sale";

type Props = {
    page: SalePage;
    onPageChange: Function;
}


const Paginator = ({ page, onPageChange }: Props) => {

    return (
        <div className="row d-flex justify-content-center">

            <nav>
                <ul className="pagination">
                    <li className={`page-item ${page.first ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page.number - 1)} >Anterior</button>
                    </li>
                    <li className="page-item disabled">
                        <button className="page-link">{page.number + 1}</button>
                    </li>
                    <li className={`page-item ${page.last ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page.number + 1)}>Próximo</button>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Paginator