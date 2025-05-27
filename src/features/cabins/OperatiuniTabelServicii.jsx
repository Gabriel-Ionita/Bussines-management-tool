import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sorteaza from "../../ui/Sorteaza";

function OperatiuniTabelServicii() {
    return (
        <TableOperations>
            <Filter 
            filteredField="reducere" 
            options={[
                {value: "all", label: "Toate"},
                {value: "noDiscount", label: "Nu au Reducere"},
                {value: "withDiscount", label: "Au Reducere"},
            ]}/>

            <Sorteaza options={[
                {value: "nume-asc", label: "Alfabetic (A-Z)"},
                {value: "nume-desc", label: "Alfabetic (Z-A)"},
                {value: "pretdeBAza-asc", label: "Pret (creascator)"},
                {value: "pretdeBAza-desc", label: "Pret (descrescator)"},
            ]}/>
        </TableOperations>
    )
}

export default OperatiuniTabelServicii;
