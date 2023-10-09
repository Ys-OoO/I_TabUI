import styled from 'styled-components';

export const Flex = styled.div`
  display : flex;
  overflor : auto;
`;

export const FlexColumn = styled(Flex)`
  flex-direction : column;
`
export const FlexRow = styled(Flex)`
  flex-direction : row;
`

export const FlexCenter = styled(Flex)`
  align-items : center;
`

export const FlexAuto = styled(Flex)`
  flex : 1 1 0;
`