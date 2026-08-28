import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

type Place = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
};

const PLACES: Place[] = [
  {
    id: "1",
    name: "มหาวิทยาลัยขอนแก่น",
    description: "Khon Kaen University",
    latitude: 16.4730,
    longitude: 102.8206,
  },
  {
    id: "2",
    name: "บึงแก่นนคร",
    description: "Bueng Kaen Nakhon",
    latitude: 16.4205,
    longitude: 102.8457,
  },
  {
    id: "3",
    name: "วัดหนองแวง",
    description: "Wat Nong Wang",
    latitude: 16.4158,
    longitude: 102.8388,
  },
  {
    id: "4",
    name: "Central Khon Kaen",
    description: "ศูนย์การค้าเซ็นทรัล ขอนแก่น",
    latitude: 16.4324,
    longitude: 102.8265,
  },
  {
    id: "5",
    name: "ตลาดต้นตาล",
    description: "Ton Tann Market",
    latitude: 16.4215,
    longitude: 102.8094,
  },
  {
    id: "6",
    name: "ศาลหลักเมืองขอนแก่น",
    description: "Khon Kaen City Pillar Shrine",
    latitude: 16.4327,
    longitude: 102.8344,
  },
  {
    id: "7",
    name: "บึงทุ่งสร้าง",
    description: "Bueng Thung Sang",
    latitude: 16.4564,
    longitude: 102.8079,
  },
  {
    id: "8",
    name: "พิพิธภัณฑสถานแห่งชาติ ขอนแก่น",
    description: "Khon Kaen National Museum",
    latitude: 16.4416,
    longitude: 102.8295,
  },
  {
    id: "9",
    name: "สวนสาธารณะบึงทุ่งสร้าง",
    description: "Public recreation area",
    latitude: 16.4545,
    longitude: 102.8100,
  },
  {
    id: "10",
    name: "สถานีรถไฟขอนแก่น",
    description: "Khon Kaen Railway Station",
    latitude: 16.4320,
    longitude: 102.8277,
  },
];

const INITIAL_REGION = {
  latitude: 16.441,
  longitude: 102.828,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);

  const [selectedPlace, setSelectedPlace] =
    useState<Place>(PLACES[0]);

  const selectPlace = (place: Place) => {
    setSelectedPlace(place);

    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      700
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          KHON KAEN POI
        </Text>

        <Text style={styles.subtitle}>
          Explore important places
        </Text>
      </View>

      {/* Map */}

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={INITIAL_REGION}
        >
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            description={selectedPlace.description}
          />
        </MapView>

        <View style={styles.selectedCard}>
          <Text style={styles.selectedLabel}>
            SELECTED PLACE
          </Text>

          <Text style={styles.selectedName}>
            {selectedPlace.name}
          </Text>

          <Text style={styles.selectedDescription}>
            {selectedPlace.description}
          </Text>
        </View>
      </View>

      {/* List Header */}

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          Important Places
        </Text>

        <Text style={styles.placeCount}>
          {PLACES.length} Places
        </Text>
      </View>

      {/* Place List */}

      <FlatList
        data={PLACES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const isSelected =
            selectedPlace.id === item.id;

          return (
            <Pressable
              onPress={() => selectPlace(item)}
              style={[
                styles.placeCard,
                isSelected && styles.placeCardSelected,
              ]}
            >
              <View style={styles.numberBox}>
                <Text
                  style={styles.numberText}
                >
                  {index + 1}
                </Text>
              </View>

              <View style={styles.placeInfo}>
                <Text
                  style={[
                    styles.placeName,
                    isSelected &&
                      styles.placeNameSelected,
                  ]}
                >
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.placeDescription,
                    isSelected &&
                      styles.placeDescriptionSelected,
                  ]}
                >
                  {item.description}
                </Text>
              </View>

              <Text style={styles.pinIcon}>
                📍
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  // Header

  header: {
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },

  subtitle: {
    color: "#BFD0E5",
    fontSize: 13,
    marginTop: 4,
  },

  // Map

  mapContainer: {
    height: 280,
    margin: 16,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#DDD",
    elevation: 4,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  selectedCard: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 14,
  },

  selectedLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  selectedName: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },

  selectedDescription: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  // List

  listHeader: {
    paddingHorizontal: 20,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "800",
  },

  placeCount: {
    color: "#6B7280",
    fontSize: 12,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  // Place Card

  placeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  placeCardSelected: {
    backgroundColor: "#1E3A5F",
  },

  numberBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  numberText: {
    color: "#1E3A5F",
    fontWeight: "800",
  },

  placeInfo: {
    flex: 1,
  },

  placeName: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "700",
  },

  placeNameSelected: {
    color: "#FFFFFF",
  },

  placeDescription: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
  },

  placeDescriptionSelected: {
    color: "#C9D9EA",
  },

  pinIcon: {
    fontSize: 20,
  },
});