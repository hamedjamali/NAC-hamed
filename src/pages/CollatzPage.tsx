import React, { FC, useState } from 'react';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
  height: 80px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 70px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  width: 140px;
  height: 40px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
  height: 110px;
  padding: 24px 12px;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
  padding: 12px;
  align-items: center;
  justify-content: right;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Result = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 90px;
  font-size: 18px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  text-align: left;
      width: 522px;
`;

const Line = styled.div`
  border-top: 1px solid #ccc;
  width: 100vw;
  height: 4px;
  margin: 37px 0px;
`;

const CollatzPage: FC = () => {
  const [number, setNumber] = useState<number | string>('');
  const [loops, setLoops] = useState<number | null>(null);

  const getCollatzLoops = (num: number): number => {
    let count = 0;
    while (num !== 1) {
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        num = 3 * num + 1;
      }
      count++;
    }
    return count;
  };

  const handleSubmit = () => {
    if (typeof number === 'number') {
      const res = getCollatzLoops(number);
      setLoops(res);
    }
  };

  return (
    // <PageWrapper>
    //   <Title>Collatz Conjecture</Title>
    //   <Input
    //     type="number"
    //     value={number}
    //     onChange={(e) => setNumber(parseInt(e.target.value))}
    //     placeholder=""
    //   />
    //   <Box>
    //     <Button onClick={handleSubmit}>Submit</Button>
    //   </Box>
    //   {loops !== null && (
    //     <ResultBox>
    //       <Result>{loops}</Result>
    //     </ResultBox>
    //   )}
    // </PageWrapper>
    <PageWrapper>
    <Title>Collatz Conjecture</Title>
    <Label>Inter your number</Label>
    <Input
      type="number"
      value={number}
      onChange={(e) => setNumber(parseInt(e.target.value))}
      placeholder=""
    />
    <Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
    <Line></Line>
    {loops !== null && (
      <>
        <Label>Inter your number</Label>
        <ResultBox>
          <Result>{loops}</Result>
        </ResultBox>
      </>
    )}
  </PageWrapper>
  );
};

export default CollatzPage;
