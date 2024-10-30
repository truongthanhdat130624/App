import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  PressableAndroidRippleConfig,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  Route,
  SceneRendererProps,
  TabBarIndicatorProps,
  TabBarItemProps,
} from "react-native-tab-view";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SecondRoute from "./Profiletabs/SecondRoute";
import FirstRoute from "./Profiletabs/FirstRoute";
import SignlnScreen from "../SignlnScreen";
import GetOrders from "../GetOrders"; // Import màn hình GetOrders
import { Scene, Event } from "react-native-tab-view/lib/typescript/src/types";
import OrderDetails from "../OrderDetails";

const Stack = createStackNavigator();

export default class Profile extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Profile" },
      { key: "second", title: "Settings" },
    ],
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Profile">
          {/* Tab Navigator cho phần profile */}
          <Stack.Screen
            name="Profile"
            component={this.ProfileTabView}
            options={{ headerShown: false }}
          />
          {/* Màn hình đăng nhập không nằm trong TabView */}
          <Stack.Screen
            name="Signln"
            component={SignlnScreen}
            options={{ headerShown: false }} // Đây là màn hình đăng nhập, không có tab
          />
          <Stack.Screen
            name="GetOrders"
            component={GetOrders}
            options={{ headerShown: false, title: "My Orders" }}
          />
              <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{ headerShown: false, title: "My Orders" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  ProfileTabView = () => {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={this.renderTabBar}
        />
      </View>
    );
  };

  renderTabBar = (
    props: React.JSX.IntrinsicAttributes &
      SceneRendererProps & {
        navigationState: NavigationState<Route>;
        scrollEnabled?: boolean;
        bounces?: boolean;
        activeColor?: string;
        inactiveColor?: string;
        pressColor?: string;
        pressOpacity?: number;
        getLabelText?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getAccessible?:
          | ((scene: Scene<Route>) => boolean | undefined)
          | undefined;
        getAccessibilityLabel?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined;
        renderLabel?:
          | ((
              scene: Scene<Route> & { focused: boolean; color: string }
            ) => React.ReactNode)
          | undefined;
        renderIcon?:
          | ((
              scene: Scene<Route> & { focused: boolean; color: string }
            ) => React.ReactNode)
          | undefined;
        renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined;
        renderIndicator?:
          | ((props: TabBarIndicatorProps<Route>) => React.ReactNode)
          | undefined;
        renderTabBarItem?:
          | ((
              props: TabBarItemProps<Route> & { key: string }
            ) => React.ReactElement)
          | undefined;
        onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined;
        onTabLongPress?: ((scene: Scene<Route>) => void) | undefined;
        tabStyle?: StyleProp<ViewStyle>;
        indicatorStyle?: StyleProp<ViewStyle>;
        indicatorContainerStyle?: StyleProp<ViewStyle>;
        labelStyle?: StyleProp<TextStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
        gap?: number;
        testID?: string;
        android_ripple?: PressableAndroidRippleConfig;
      }
  ) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabLabel, focused && styles.focusedLabel]}>
          {route.title}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fffffc",
  },
  tabBar: {
    backgroundColor: "#ffffff",
  },
  indicator: {
    backgroundColor: "#000000",
  },
  tabLabel: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  focusedLabel: {
    color: "#000000",
  },
});
