"use client";
import { useRouter } from "next/navigation";
import NavigationTop from "src/components/navigations/NavigationTopBack";
import Flex from "src/components/common/Flex";
import SelectBox from "src/components/selectbox/selectbox";
import { ORGANIZATION_OPTIONS } from "src/constants/options";
import ElementarySchool from "./components/elementary-school";
import MidHighSchool from "./components/middle-high-school";
import University from "./components/university";
import Graduate from "./components/graduate";

import { useAppSelector } from "src/hooks/useReduxHooks";
import Icon from "src/components/Icon/Icon";

const Organization = () => {
    const router = useRouter();
    const selected = useAppSelector((state) => state.organization.selected);

    return (
        <Flex height="100%" direction="column" justify="start" gap={24}>
            <NavigationTop
                leftIcon={
                    <Icon
                        icon="LeftArrow"
                        onClick={() => router.push("/auth/default")}
                    />
                }
                title="회원 가입"
            />
            <SelectBox
                label="소속"
                options={ORGANIZATION_OPTIONS}
                value={selected}
            />
            {selected === "초등학생" && <ElementarySchool />}
            {selected === "중/고등학생" && <MidHighSchool />}
            {selected === "대학생" && <University />}
            {selected === "졸업생" && <Graduate />}
        </Flex>
    );
};

export default Organization;
