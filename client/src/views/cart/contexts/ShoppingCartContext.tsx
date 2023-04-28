import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { message } from 'antd';
import { LocalStorageService } from '../../../common/services/localStorageService';
import { ICart, GET_CART } from '../queries/cart.query';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_CART } from '../mutations/create-cart.mutation';
import { useSession } from '../../../common/contexts/SessionContext';
import { ADD_ITEM_TO_CART } from '../mutations/add-item-to-cart.mutation';
import { REMOVE_ITEM_FROM_CART } from '../mutations/remove-item-from-cart.mutation';
import { SET_ITEM_QUANTITY } from '../mutations/set-item-quantity.mutation';

interface ShoppingCartContextData {
  cart: ICart | null;
  errorCreateCart: ApolloError | undefined;
  errorAddItemToCart: ApolloError | undefined;
  errorRemoveItemFromCart: ApolloError | undefined;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  setItemQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const ShoppingCartContext = createContext<ShoppingCartContextData>(
  {} as ShoppingCartContextData,
);

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  //*** CONTEXTS ***//

  const { user } = useSession();

  //*** HOOKS ***//

  const [cart, setCart] = useState<ICart | null>(null);
  const userRef = useRef(user);
  const [messageApi, messageContextHolder] = message.useMessage();

  //*** GRAPHQL ***//

  const [
    getCart,
    { loading: loadingGetCart, error: errorGetCart, data: dataGetCart },
  ] = useLazyQuery<{ cart: ICart }>(GET_CART);

  const [createCartMutation, { error: errorCreateCart }] = useMutation<{
    createCart: ICart;
  }>(CREATE_CART);

  const [addItemToCartMutation, { error: errorAddItemToCart }] = useMutation<{
    addItemToCart: ICart;
  }>(ADD_ITEM_TO_CART);

  const [removeItemFromCartMutation, { error: errorRemoveItemFromCart }] =
    useMutation<{ removeItemFromCart: ICart }>(REMOVE_ITEM_FROM_CART);

  const [setItemQuantityMutation, { error: errorSetItemQuantity }] =
    useMutation<{ setItemQuantity: ICart }>(SET_ITEM_QUANTITY);

  //*** HANDLERS ***//

  const handleSetCart = useCallback((cart: ICart | null) => {
    setCart(cart);

    if (cart) {
      LocalStorageService.setItem('cartId', cart.id);
    } else {
      LocalStorageService.removeItem('cartId');
    }
  }, []);

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (errorCreateCart) {
      messageApi.open({
        type: 'error',
        content:
          'Could not add a first item to the cart, please try again in a few minutes or contact support.',
      });
    }

    if (errorAddItemToCart) {
      messageApi.open({
        type: 'error',
        content:
          'Could not add an item to the cart, please try again in a few minutes or contact support.',
      });
    }

    if (errorSetItemQuantity) {
      messageApi.open({
        type: 'error',
        content:
          'Could not change item quantity in the cart, please try again in a few minutes or contact support.',
      });
    }

    if (errorRemoveItemFromCart) {
      messageApi.open({
        type: 'error',
        content:
          'Could not remove item from the cart, please try again in a few minutes or contact support.',
      });
    }
  }, [
    errorCreateCart,
    errorAddItemToCart,
    errorRemoveItemFromCart,
    errorSetItemQuantity,
    messageApi,
  ]);

  useEffect(() => {
    const cartId = LocalStorageService.getPrimitiveItem<string>('cartId');

    if (cartId) {
      getCart({ variables: { id: cartId } });
    }
  }, [getCart]);

  useEffect(() => {
    if (!loadingGetCart && !errorGetCart && dataGetCart && dataGetCart.cart) {
      handleSetCart(dataGetCart.cart);
    }
  }, [dataGetCart, errorGetCart, handleSetCart, loadingGetCart]);

  //*** API ***//

  const createCart = useCallback(
    async (productId: string, quantity: number) => {
      if (!userRef.current) return;

      const newCart = await createCartMutation({
        variables: {
          userId: userRef.current.id,
          item: { productId, quantity },
        },
      });

      if (newCart.data) {
        handleSetCart(newCart.data.createCart);
      }
    },
    [createCartMutation, handleSetCart],
  );

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      if (!cart) {
        await createCart(productId, quantity);
        return;
      }

      const updatedCart = await addItemToCartMutation({
        variables: { cartId: cart.id, input: { productId, quantity } },
      });

      if (updatedCart.data) {
        handleSetCart(updatedCart.data.addItemToCart);
      }
    },
    [addItemToCartMutation, cart, createCart, handleSetCart],
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      if (!cart) return;

      const updatedCart = await removeItemFromCartMutation({
        variables: { cartId: cart.id, productId },
      });

      if (updatedCart.data) {
        handleSetCart(updatedCart.data.removeItemFromCart);
      }
    },
    [cart, handleSetCart, removeItemFromCartMutation],
  );

  const setItemQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (!cart) return;

      const updatedCart = await setItemQuantityMutation({
        variables: { cartId: cart.id, productId, quantity },
      });

      if (updatedCart.data) {
        handleSetCart(updatedCart.data.setItemQuantity);
      }
    },
    [cart, handleSetCart, setItemQuantityMutation],
  );

  const clearCart = useCallback(async () => {
    handleSetCart(null);
  }, [handleSetCart]);

  const api = useMemo(
    () => ({
      cart,
      errorCreateCart,
      errorAddItemToCart,
      errorRemoveItemFromCart,
      addToCart,
      removeFromCart,
      setItemQuantity,
      clearCart,
    }),
    [
      addToCart,
      cart,
      errorAddItemToCart,
      errorCreateCart,
      errorRemoveItemFromCart,
      clearCart,
      removeFromCart,
      setItemQuantity,
    ],
  );

  return (
    <ShoppingCartContext.Provider value={api}>
      {messageContextHolder}
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
