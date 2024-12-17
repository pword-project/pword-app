
//import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, FlatList, Image,View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

type SlideItem = {
    id: string;
    image: any;
    title: string;
    subtitle: string;
  };

const slides: SlideItem[] = [
    {
        id: '1',
        image: require('../../assets/images/insert_image_icon.png'),
        title: 'Welcome to PWord',
        subtitle: 'Learn only what you need'
    },
    {
        id: '2',
        image: require('../../assets/images/insert_image_icon.png'),
        title: 'Add FlashCards',
        subtitle: 'Add a new word and generate definiton and example'
    },
    {
        id: '3',
        image: require('../../assets/images/insert_image_icon.png'),
        title: 'Edit FlashCards',
        subtitle: 'Change definiton and example'
    },
    {
        id: '4',
        image: require('../../assets/images/insert_image_icon.png'),
        title: 'Delete a Flashcards',
        subtitle: 'Learn only what you need'
    },
];
const Slide: React.FC<{item: SlideItem}> = ({item}) => {
    return(
        <ThemedView style={styles.slide}>
            <Image source={item.image}
                style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </ThemedView>
    )
}
export default function onboarding(){
    const [currentSlideIndex, SetCurrentSlideIndex] = React.useState(0)
    const ref = React.useRef<FlatList>(null)
    const router = useRouter();
    //cambio del indice del slide actual para la barra de progreso
    const changeSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) =>{
        const contentOSX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOSX / width)
        console.log(currentIndex)
        SetCurrentSlideIndex(currentIndex)
    }
    // Cambio de slide desde el boton Next
    const nextSlide = () =>{
        const nsIndex = currentSlideIndex + 1;
        if(nsIndex != slides.length){
            const offset = nsIndex * width;
            ref?.current?.scrollToOffset({offset})
            SetCurrentSlideIndex(nsIndex)
        }
    }
    // función para saltar a la ultima slide
    const skip = () =>{
        const lastSlideIndex = slides.length - 1
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        SetCurrentSlideIndex(lastSlideIndex);
    }

    //función para saltar al home y guardar la finalización del onboarding
    async function finish(){
        try {
            const onboardingState = true;
            await AsyncStorage.setItem('onboarding_state', JSON.stringify(onboardingState));
            console.log(onboardingState)
            router.replace('/home')
        } catch (e) {
            console.error('Error al guardar el estado del onboarding:', e);
        }
        try{
            console.log(await AsyncStorage.getItem('onboarding_state'))
        } catch(e){
            console.error('Error al cargar el estado del onboarding:', e);
        }
        router.replace('/home')
    }
    
    //Contenedor de los botones de skip, next y finish
    const Footer = () =>{
        return (
            <ThemedView style={styles.footer}>
                <ThemedView style={{flexDirection: 'row', justifyContent:'center', marginTop:20}}>
                    {slides.map((_,index)=>(
                        <ThemedView  
                            key={index} 
                            style={[
                                styles.indicator, 
                                currentSlideIndex == index && {
                                    backgroundColor: 'white',
                                    width: 25,
                            },
                            ]}
                        />
                    ))}                    
                </ThemedView>
                <ThemedView style={{marginBottom:20}}>
                    <ThemedView>
                        {currentSlideIndex == slides.length -1 ? 
                            (<ThemedView style={{flexDirection: 'row'}}>
                                <Pressable style={styles.button}>
                                    <Text style={{fontWeight:'bold', fontSize:15}} onPress={finish}>Finish</Text>
                                </Pressable> 
                            </ThemedView>) :
                            (<ThemedView style={{flexDirection: 'row'}}>
                                <Pressable style={[styles.button,{
                                    backgroundColor:'transparent',
                                    borderWidth:2,
                                    borderColor: 'white'
                                }]} onPress={skip}>
                                    <Text style={{fontWeight:'bold', fontSize:15, color:'white'}}>Skip</Text>
                                </Pressable>
                                <ThemedView style={{width:15}}/>
                                <Pressable style={styles.button} onPress={nextSlide}>
                                    <Text style={{fontWeight:'bold', fontSize:15}}>Next</Text>
                                </Pressable>                        
                            </ThemedView>)    
                    }
                    </ThemedView>                    
                </ThemedView>
            </ThemedView>
        )
    }
    return(
        <SafeAreaView style={styles.container}>    
            <StatusBar backgroundColor="blue"></StatusBar>        
            <FlatList 
                ref = {ref}
                onScroll={changeSlideIndex}
                scrollEventThrottle={16}
                pagingEnabled
                data={slides} 
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=> <Slide item={item}/>}
            >
            </FlatList>
            <Footer/>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create(
    {   
        image:{
            height:"75%",
            width: '100%',
            resizeMode: 'contain'
        },
        title:{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center'
        },
        subtitle:{
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
            maxWidth: '70%',
            textAlign: 'center',
        },
        slide:{
            width,
            textAlignVertical: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: 'grey',
            height: height*0.8,
        },
        container:{
            flex:1,
            //backgroundColor: 'grey'

        },
        footer:{
            height: height*0.2, 
            justifyContent: 'space-between', 
            paddingHorizontal:20,
        },
        indicator:{
            height: 2.5,
            width:10,
            backgroundColor: 'grey',
            marginHorizontal: 3,
            borderRadius: 2,
        },
        button:{
            flex:1,
            backgroundColor: 'white',
            borderRadius: 5,
            justifyContent:'center',
            alignItems: 'center',
            height:50,
        }
    }
)