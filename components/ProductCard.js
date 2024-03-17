import { View, Text, StyleSheet, Image ,Platform} from "react-native";

const getTypeDetails = (type) => {
  switch (type.toLowerCase()) {
  
    case type.toLowerCase():
      return { borderColor: "#FF5733", emoji: "$" };
      
   
  }
};

export default function ProductCard({
  name,
  image,
  type,
  hp,
  created_at,
  updated_at,
  country,
  
}) {
  const { borderColor, emoji } = getTypeDetails(type);
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.hp}>Weight: {hp}</Text>
      </View>

      <Image
        source={image}
        accessibilityLabel={`${name} Product`}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.typeContainer}>
        <View style={[styles.badge, { borderColor }]}>
          <Text style={styles.typeEmoji}>{emoji}</Text>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>
      <View style={styles.countryContainer}>
        <Text style={styles.typeText}>{country}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Created At : {created_at}</Text>
      </View>

      <View style={styles.updateDateContainer}>
        <Text style={styles.updateDateText}>
          Updated At : {updated_at}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  hp: {
    fontSize: 22,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 4,
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  typeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  dateContainer: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  updateDateContainer: {
    marginBottom: 8,
  },
  updateDateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
