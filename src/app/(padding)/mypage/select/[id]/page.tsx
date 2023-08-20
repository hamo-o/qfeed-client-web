"use client";

import styled from "styled-components";
import BottomNavigation from "src/components/BottomNavigation";

import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import { colors, repeatBackgroundColor } from "styles/theme";

import { useAppDispatch } from "src/hooks/useReduxHooks";
import { changeVisibleType } from "src/reducer/slices/bottomSheet/bottomSheetSlice";
import NavigationTopBack from "src/components/navigations/NavigationTopBack";

export default function SelectDetailPage({
    params
}: {
    params: { id: number };
}) {
    const dispatch = useAppDispatch();
    const handleClickShowHint = () => {
        dispatch(
            changeVisibleType({
                type: "bottomSheet",
                value: [1, "hint"]
            })
        );
    };
    return (
        <Flex direction="column" align="center" gap={94}>
            <NavigationTopBack rightIcon={<div>아이콘</div>} />
            <Title typo="Headline1b">
                애인에게 가장 잘 해줄 것 같은 사람은?
            </Title>
            <Flex direction="column" gap={16}>
                {[0, 1, 2, 3, 5].map((idx: number) => (
                    <HintItem key={idx} idx={idx} onClick={handleClickShowHint}>
                        <Person typo="Subtitle2b" color="light_qblack">
                            02년생 여자
                        </Person>
                        <Message>아이콘</Message>
                        <Hint width={"auto"}>
                            <HintText typo="Subtitle2b" idx={idx}>
                                첫 번째 글자 ㅁ
                            </HintText>
                        </Hint>
                    </HintItem>
                ))}
            </Flex>
            <BottomNavigation />
        </Flex>
    );
}

const Title = styled(Text)`
    width: 185px;
    word-break: keep-all;
    text-align: center;
`;

const HintItem = styled(Flex)<{ idx: number }>`
    height: 50px;
    background: ${({ idx }) => colors[repeatBackgroundColor[idx % 12]]};

    border-radius: 10px;
    overflow: hidden;
`;

const Person = styled(Text)`
    width: 100%;
    padding: 0 20px;
`;

const Message = styled(Flex)`
    width: 73px;
    min-width: 73px;
    height: 100%;

    background: ${colors.light_qblack};
`;

const Hint = styled(Flex)`
    height: 100%;
    padding: 0 20px;
    background: ${colors.light_qwhite};
    white-space: nowrap;
`;

const HintText = styled(Text)<{ idx: number }>`
    color: ${({ idx }) => repeatBackgroundColor[idx]};
`;