"use client";
import { forwardRef } from "react";
import useBottomSheet from "src/hooks/useBottomSheet";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxHooks";
import {
    changeAction,
    changeVisible,
    changeVisibleType
} from "src/reducer/slices/bottomSheet/bottomSheetSlice";
import styled, { css, keyframes } from "styled-components";
import { colors, KeyOfColor } from "styles/theme";
import { RootState } from "src/store";
import dynamic from "next/dynamic";

interface Props {
    children?: any;
}

const COMPONENT_HEIGHT: any = {
    report: 540 + 30,
    reportFriend: 331,
    coin: 324 + 30,
    friend: 394,
    friendModal: 325 + 60,
    chattingCoin: 376,
    hint: 376
};

const BottomSheet = forwardRef(function Div(
    { children, ...props }: Props,
    ref
) {
    const dispatch = useAppDispatch();
    const { type, visible, actionDelay, selectedIdx } = useAppSelector(
        (state: RootState) => state.bottomSheet
    );
    const BOTTOMSHEET_HEIGHT = COMPONENT_HEIGHT[type];

    const propertyData = {
        selectedIdx
    };
    const DynamicComponent = dynamic<typeof propertyData>(
        () =>
            import(`./children/${type.charAt(0).toUpperCase() + type.slice(1)}`)
    );

    const handleMove = (move: number) => {
        if (move)
            dispatch(
                changeVisible({
                    type: "bottomSheet",
                    value: move
                })
            );
        else
            dispatch(
                changeVisible({
                    type: "bottomSheet",
                    value: move
                })
            );
    };

    const handleClickBackground = () => {
        dispatch(
            changeAction({
                type: "bottomSheet",
                value: { on: false }
            })
        );
        sheet.current!.style.setProperty("transform", `translateY(-${0}px)`);
        setTimeout(() => {
            dispatch(
                changeVisibleType({
                    type: "bottomSheet",
                    value: [0, "bottomSheet", null]
                })
            );
        }, 300);
    };

    const { sheet, content } = useBottomSheet({
        visible,
        handleClickBackground,
        handleMove,
        BOTTOMSHEET_HEIGHT
    });

    return (
        <>
            <Background
                actionDelay={actionDelay}
                visible={visible}
                onClick={handleClickBackground}
            />
            <BottomSheetWrapper
                ref={sheet}
                actionDelay={actionDelay}
                visible={visible}
                height={BOTTOMSHEET_HEIGHT}
                selectedIdx={selectedIdx}
                backgroundColor={
                    type === "coin" ||
                    type === "chattingCoin" ||
                    type === "hint"
                        ? "light_gray3"
                        : "light_gray0"
                }
            >
                <HandleWrapper>
                    <Handle
                        selectedIdx={selectedIdx}
                        backgroundColor={
                            type === "coin" ||
                            type === "chattingCoin" ||
                            type === "hint"
                                ? "light_gray1"
                                : "light_gray1"
                        }
                    />
                </HandleWrapper>
                <ContentWrapper ref={content}>
                    <DynamicComponent {...propertyData} />
                </ContentWrapper>
            </BottomSheetWrapper>
        </>
    );
});

const fade = (actionDelay: number) => keyframes`
  from {
    opacity: ${actionDelay ? 0 : 1};
  }
  to {
    opacity: ${actionDelay ? 1 : 0};
  }
`;

const slide = (actionDelay: number, height: number) => keyframes`
  from {
    transform: translateY(${actionDelay ? 0 : -height + "px"});
  }
  to {
    transform: translateY(${actionDelay ? -height + "px" : 0});
  }
`;

const Background = styled.div<{
    actionDelay: number;
    visible: number;
}>`
    width: 100%;
    height: 100%;

    display: flex;
    position: absolute;
    top: 0;

    ${({ actionDelay, visible }) =>
        visible === 0 || visible === 1
            ? css`
                  animation: ${fade(actionDelay)} 300ms forwards;
              `
            : css`
                  opacity: ${visible};
              `}
    background-color: ${colors.line_black_50};
    z-index: 998;
`;

const HandleWrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;

    background-color: transparent;
`;

const Handle = styled.div<{ selectedIdx: number; backgroundColor: KeyOfColor }>`
    width: 73px;
    height: 4px;
    margin: auto;
    display: flex;

    background-color: ${({ selectedIdx, backgroundColor }) =>
        selectedIdx !== -1 ? colors["light_qwhite"] : colors[backgroundColor]};
`;

const BottomSheetWrapper = styled.div<{
    height: number;
    actionDelay: number;
    visible: number;
    selectedIdx: number;
    backgroundColor: KeyOfColor;
}>`
    width: 100%;
    height: ${({ height }) => height + "px"};

    display: flex;
    flex-direction: column;

    position: fixed;
    bottom: ${({ height }) => -height + "px"}; // -height

    color: ${({ color }) => color};
    border-radius: 10px 10px 0 0;
    background-color: ${({ selectedIdx, backgroundColor }) =>
        selectedIdx !== -1 ? colors["light_qwhite"] : colors[backgroundColor]};
    z-index: 999;

    transition: transform 300ms ease-out;

    ${({ height, actionDelay, visible }) =>
        visible === 1
            ? css`
                  animation: ${slide(actionDelay, height)} 300ms forwards;
              `
            : css``}
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
    overflow: none;
`;

export default BottomSheet;
