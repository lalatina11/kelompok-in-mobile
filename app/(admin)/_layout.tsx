import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Kelompok IN | Admin", href: null }}
      />
    </Tabs>
  );
};

export default Layout;
