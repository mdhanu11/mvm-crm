function TabContent({ value, active, children }: { value: string, active: string, children: any }) {
    return (
        <>
            {
                value == active && children
            }
        </>
    )
}

export default TabContent