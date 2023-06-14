import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

const LightsScreen = () => {
    const [temperature, setTemperature] = useState(10);

    let thumbColor = '#c3d396';

    if (temperature < 17) {
        thumbColor = 'blue';
    } else if (temperature > 30) {
        thumbColor = 'red';
    }

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={-20}
                    maximumValue={100}
                    value={temperature}
                    thumbTintColor={thumbColor}
                    minimumTrackTintColor={thumbColor}
                    maximumTrackTintColor="#d3d3d3"
                    disabled
                />
                <View
                    style={[
                        styles.sliderBar,
                        { left: `${((temperature + 20) / 120) * 100}%` },
                    ]}
                />
            </View>
            <Text style={[styles.temperatureText, { color: thumbColor }]}>{temperature}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    sliderContainer: {
        width: '80%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        flex: 1,
    },
    sliderBar: {
        position: 'absolute',
        height: 8,
        width: 8,
        borderRadius: 4,
        zIndex: 1,
    },
    temperatureText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
});

export default LightsScreen;