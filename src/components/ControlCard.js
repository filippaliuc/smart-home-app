import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ControlCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    width: '50%', // Occupies half of the row
    aspectRatio: 1.2, // Square shape
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ControlCard;
