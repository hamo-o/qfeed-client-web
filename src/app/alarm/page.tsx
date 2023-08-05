"use client";
import NewAlarm from "src/components/pages/alarm/NewAlarm";
import Spacing from "src/components/Spacing";
import BackTitle from "src/components/Title/BackTitle";
import styled from "styled-components";

const AlarmDatas = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function Page() {
    return (
        <AlarmWrapper>
            <BackTitle type="default" text="알림 페이지" />

            <Spacing size={8} />
            {AlarmDatas.map((data: any, idx: number) => {
                return <NewAlarm key={idx} />;
            })}
        </AlarmWrapper>
    );
}

const AlarmWrapper = styled.div`
    height: 100%;
    // padding: 0 16px;
`;
