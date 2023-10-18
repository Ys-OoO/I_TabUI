import styled from 'styled-components';

export const Flex = styled.div`
  display : flex;
  overflor : auto;
`;

export const FlexColumn = styled(Flex)`
  flex-direction : column;
`

export const FlexColumnCenter = styled(FlexColumn)`
  align-items : center;
`

export const FlexColumnAuto = styled(FlexColumn)`
  flex : 1 1 0;
`

export const FlexRow = styled(Flex)`
  flex-direction : row;
`

export const FlexRowAuto = styled(FlexRow)`
  flex : 1 1 0;
`

export const FlexCenter = styled(Flex)`
  align-items : center;
`

export const FlexCenterAuto = styled(FlexCenter)`
  flex : 1 1 0;
`

export const FlexAuto = styled(Flex)`
  flex : 1 1 0;
`

export const Title = styled.div`
  font-size: 16px;
`