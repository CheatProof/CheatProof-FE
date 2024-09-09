import React, { ReactNode, useState } from "react";

// Define types for Tab props and Tabs component props
interface TabProps {
  children: ReactNode;
  activeTab: number;
  currentTab: number;
  setActiveTab: (tabIndex: number) => void;
}

interface TabsProps {
  children: React.ReactElement<{ active?: boolean; component: ReactNode }>[];
}

// Tabs Component
export function Tabs({ children }: TabsProps) {
  // Helper functions
  function findActiveTab(a: TabsProps["children"]): number {
    return a.reduce((accumulator, currentValue, i) => {
      if (currentValue.props.active) {
        return i;
      }
      return accumulator;
    }, 0);
  }

  function tabValidator(tab: React.ReactElement): boolean {
    return tab.type.displayName === "Tab";
  }

  // State to track active tab
  const [activeTab, setActiveTab] = useState<number>(findActiveTab(children));

  return (
    <>
      <div className="flex dark:border-blackSecondary border-blackSecondary/35 dark:bg-blackPrimary bg-whiteSecondary border-b-[0.05rem]">
        {children.map((item, i) => (
          <React.Fragment key={`tab-${i}`}>
            {tabValidator(item) && (
              <Tab
                currentTab={i}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                {item.props.children}
              </Tab>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="p-5">
        {children.map((item, i) => (
          <div key={`content-${i}`} className={`${i === activeTab ? "visible" : "hidden"}`}>
            {item.props.component}
          </div>
        ))}
      </div>
    </>
  );
}

// Tab Component
export function Tab({ children, activeTab, currentTab, setActiveTab }: TabProps) {
  return (
    <div
      className={`px-10 py-2 cursor-pointer
        ${activeTab === currentTab ? "bg-white/75 border-b-[0.2rem] border-sky-500" : ""}`}
      onClick={() => setActiveTab(currentTab)}
    >
      {children}
    </div>
  );
}

Tab.displayName = "Tab";
