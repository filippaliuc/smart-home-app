import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InformationCard = ({ value, label }) => {
  const handleCardPress = () => {
    // Handle card press event
    console.log('Card pressed!');
  };

  if (label === "Alarmă de incendiu !") {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "red" }]}
        activeOpacity={1}
      >
        <View style={[styles.cardContent, { justifyContent: "center" }]}>
          <Text style={[styles.value, { color: "white" }]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  else {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={1}
      >
        <View style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Text style={styles.label}>{label}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 10,
    marginBottom: 10
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end'
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
  },
});

export default InformationCard;
