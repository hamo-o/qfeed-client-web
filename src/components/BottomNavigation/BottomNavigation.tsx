"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { colors } from "styles/theme";
import { Route } from "src/constants/Route";
import styled from "styled-components";
import Icon from "../Icon";
import Flex from "../common/Flex";

interface Props {}

const BottomNavigation = ({}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <BottomNavigationWrapper>
            <BottomNavigationInner>
                <NavIconWrapper href={"/"}>
                    <Icon
                        icon="BHome"
                        width={24}
                        height={24}
                        selected={pathname === "/"}
                    />
                </NavIconWrapper>
                {/* <NavIconWrapper
                    onClick={() => {
                        router.push(Route.CHAT());
                    }}
                >
                    <Icon
                        icon="BChat"
                        width={24}
                        height={24}
                        selected={Boolean(pathname.match("/((chat).*)"))}
                    />
                </NavIconWrapper> */}
                <NavIconWrapper href={"/friend"}>
                    <Icon
                        icon="BSearch"
                        width={24}
                        height={24}
                        selected={Boolean(pathname.match("/((friend).*)"))}
                    />
                </NavIconWrapper>
                <NavIconWrapper href={"mypage"}>
                    <Icon
                        icon="BMypage"
                        width={24}
                        height={24}
                        selected={Boolean(pathname.match("/((mypage).*)"))}
                    />
                </NavIconWrapper>
            </BottomNavigationInner>
        </BottomNavigationWrapper>
    );
};

const BottomNavigationWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    height: 68px;

    position: fixed;
    bottom: 0;
    background-color: ${colors.light_qblack};
    z-index: 900;
`;

const BottomNavigationInner = styled.div`
    height: 100%;
    padding: 0 1rem;

    color: ${colors.light_qwhite};

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid ${colors.light_qwhite};
`;

const NavIconWrapper = styled(Link)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default BottomNavigation;
