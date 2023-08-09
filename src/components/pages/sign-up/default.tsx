"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ButtonFillLarge from "src/components/buttons/button-fill-large";
import Flex from "src/components/common/Flex";
import InputLine from "src/components/inputs/input-line";
import NavigationTop from "src/components/navigations/navigation-top";
import ButtonGenderSelect from "src/components/sign-up/button-gender-select";
import {
    birthMsg,
    emailMsg,
    nameMsg,
    nicknameMsg,
    phoneMsg
} from "src/constants/messages";
import { useCheckNicknameQuery } from "src/hooks/account/useCheckNicknameQuery";
import { useInput } from "src/hooks/common/useInput";
import { useToggle } from "src/hooks/sign-up/useToggle";

const SignIn = () => {
    const router = useRouter();

    const name = useInput();
    const birthday = useInput();
    const phone = useInput();
    const email = useInput();
    const nickname = useInput();

    const gender = useToggle("여성");

    const isDupNickname = useCheckNicknameQuery(nickname.value);
    useEffect(() => {
        isDupNickname.refetch();
    }, [nickname.value]);

    const User = {
        name: name.value,
        gender: gender.value,
        birthday: birthday.value,
        phone: phone.value,
        email: email.value,
        nickname: nickname.value,
        isOk: isDupNickname.data?.abailable
    };

    const isActive = useCallback(
        (user: any) => {
            const result = Object.values(user).every(
                (userItem) => userItem && userItem !== null && userItem !== ""
            );
            return result;
        },
        [User]
    );

    return (
        <Flex direction="column" justify="start" gap={24}>
            <NavigationTop
                leftIcon={<div onClick={router.back}>왼</div>}
                title="회원 가입"
            />
            <Flex direction="column" justify="start" gap={24}>
                <InputLine
                    value={name.value}
                    onChange={name.handleChangeInput}
                    label="이름"
                    placeholder="ex) 황채린"
                    message={nameMsg.RIGHT}
                />
                <ButtonGenderSelect
                    value={gender.value}
                    onClick={gender.handleChangeState}
                />
                <InputLine
                    value={birthday.value}
                    onChange={birthday.handleChangeInput}
                    label="생년월일"
                    placeholder="ex) 1997.04.02"
                    message={birthMsg.RIGHT}
                />
                <InputLine
                    value={phone.value}
                    onChange={phone.handleChangeInput}
                    label="휴대폰 번호"
                    placeholder="ex) 010-5016-5886"
                    message={phoneMsg.RIGHT}
                />
                <InputLine
                    value={email.value}
                    onChange={email.handleChangeInput}
                    label="이메일"
                    placeholder="ex) ghkdcofls42@naver.com"
                    message={emailMsg.RIGHT}
                />
                <Flex align="end" gap={12}>
                    <InputLine
                        value={nickname.value}
                        onChange={nickname.handleChangeInput}
                        label="닉네임"
                        placeholder="ex) qwerk11"
                        message={
                            isDupNickname.data?.abailable
                                ? nicknameMsg.RIGHT
                                : nicknameMsg.DUPLICATE
                        }
                    />
                </Flex>
                <ButtonFillLarge
                    state={isActive(User) ? "active" : "disabled"}
                    text="다음"
                    onClick={() => router.push("/sign-up/organization")}
                />
            </Flex>
        </Flex>
    );
};

export default SignIn;