import { Button, Row } from "antd";
import { useState } from "react";

type PaginaInicialProps = {
  children?: React.ReactNode; // teste apenas
};

const PaginaInicial = (props: PaginaInicialProps): JSX.Element  => {

  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <>
      <Row>
        <Button type="primary" onClick={increment}>
          Incrementar
        </Button>
      </Row>
      <Row>
        {`contador: ${count}`}
      </Row>
    </>
  )
}

export default PaginaInicial;