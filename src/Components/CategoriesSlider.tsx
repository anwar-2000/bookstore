import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface Props {
  categories: any;
  onChange: (category: any) => void;
}

const CategoriesSlider: React.FC<Props> = ({ categories, onChange }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const handleNextClick = () => {
    if (currentCategoryIndex < categories.length - 3) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  return (
    <Container>
      <div>
        <AiFillCaretLeft onClick={handlePrevClick} />
      </div>
      <Items>
        {categories.slice(currentCategoryIndex, currentCategoryIndex + 3).map((category: any) => (
          <h1 key={category} onClick={() => onChange(category)}>
            {category}
          </h1>
        ))}
      </Items>
      <div>
        <AiFillCaretRight onClick={handleNextClick} />
      </div>
    </Container>
  );
};

export default CategoriesSlider;

const Container = styled.div`
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  h1 {
    font-weight: bold;
    cursor: pointer;
  }
`;
const Items = styled.div`
  display : flex;
  gap:1rem;
`