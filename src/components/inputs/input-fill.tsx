"use client";
import styled from "styled-components";
import Flex from "src/components/common/Flex";
import Text from "../common/Text";
import { colors } from "styles/theme";
import Icon from "../Icon/Icon";

export interface InputProps {
    value: string;
    placeholder?: string;
    onChange: any;
    message?: string;
    isError?: boolean;
    readonly?: boolean;
}

const InputFill = ({ ...props }: InputProps) => {
    return (
        <InputWrapper>
            <Input
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                readOnly={props.readonly}
            />
            <Icon icon="SearchHeart" />
        </InputWrapper>
    );
};

const InputWrapper = styled(Flex)`
    width: 100%;
    min-height: 48px;
    padding: 12px 20px;

    background: ${colors.light_gray3};
    border-radius: 48px;
`;

const Input = styled.input`
    width: 100%;
    color: ${colors.light_qwhite};
`;

export default InputFill;
