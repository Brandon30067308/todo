import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  width: 100%;
  min-width: 280px;
  margin: 25px auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 4rem 2rem;

  @media (max-width: 650px) {
    padding: 3.75rem 0.85rem;
  }

  @media (max-width: 525px) {
    padding: 2rem 0.65rem;
  }
`;

export const Input = styled.input`
  padding: 5px 26.5px;
  font-size: 17.5px;
  color: rgb(0, 0, 0);
  width: 600px;
  height: 65px;
  margin-right: 5px;
  border: 1px solid rgb(190, 190, 190);
  border-radius: .5rem;
  flex: 1 1 auto;

  &:focus {
    outline: none;
    border: 1px solid #004a99ea;
  }

  @media (max-width: 600px) {
    font-size: 17.15px;
    width: 120px;
  }

  @media (max-width: 525px) {
    font-size: 13.85px;
    padding: 3.5px 0.95rem;
    height: 60px;
  }
`;

export const Button = styled.button`
  min-width: fit-content;
  width: 170px;
  padding: 10px;
  border: none;
  border-radius: .4rem;
  height: 65px;
  background-color: #004a99ea;
  color: #fdfdfd;
  font-size: 17.5px;
  cursor: pointer;
  border: 1px solid #004a99f6;

  &:hover {
    background-color: #004a99f6;
  }

  @media (max-width: 600px) {
    font-size: 17.15px;
    width: 130px !important;
  }

  @media (max-width: 525px) {
    width: 100px;
    font-size: 13.85px;
    height: 60px;
  }
`;

export const InputGroup = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListGroup = styled.ul`
  width: 100%;
  margin-top: 10px;
  list-style-type: none;
`;

interface ListGroupItemProps {
  filter: string,
  isCompleted: boolean
}

const List = styled.li`
  border: 1px solid rgb(190, 190, 190);
  border-radius: .5rem;
  width: 100%;
  min-height: 65px;
  height: auto;
  padding: 13px 26.5px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 5px;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 17px;
  }

  @media (max-width: 525px) {
    min-height: 67px;
    max-height: 120px;
    height: 100%;
    padding: 0.575rem 0.95rem;
    font-size: 16px;
  }

  @media (max-width: 355px) {
    font-size: 14.5px;
  }
`;

export const ListGroupItem = styled(List) <ListGroupItemProps>`
  display: ${({ isCompleted, filter }) => {
    if ((!isCompleted && filter === 'done') || (isCompleted && filter === 'todo')) {
      return 'none';
    } else {
      return 'flex';
    }
  }}
`;

export const FilterGroup = styled(List)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;