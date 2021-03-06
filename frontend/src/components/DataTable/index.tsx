import axios from "axios";
import Paginator from "components/Paginator";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

const DataTable = () => {

  const [activePage, setActivePage] = useState(0);

  const [page, setPage] = useState<SalePage>({
    first: true,
    number: 0,
    last: true,
    totalElements: 0,
    totalPages: 0,
  })

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=5&sort=date,desc`)
      .then(response => {
        setPage(response.data)
      })
  }, [activePage])

  const changePage = (index: number) =>{
    setActivePage(index)
  }

  return (
    <>

    <Paginator page={page} onPageChange={changePage} ></Paginator>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map(x => (

              <tr key={x.id}>
                <td>{formatLocalDate(x.date, "dd/MM/yyyy")}</td>
                <td>{x.seller.name}</td>
                <td>{x.visited}</td>
                <td>{x.deals}</td>
                <td>{x.amount.toFixed(2)}</td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
