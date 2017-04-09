//
//  RPENativeWrapper.m
//  Example
//
//  Created by Tal Kol on 08/04/2017.
//

#import "RPENativeWrapper.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTScrollableProtocol.h>

@interface RPENativeWrapper()
@property (nonatomic) RCTBridge *bridge;
@property (nonatomic) UIView<RCTScrollableProtocol> *scrollableView;
@end

@implementation RPENativeWrapper


- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  RCTAssertParam(bridge);
  
  if ((self = [super initWithFrame:CGRectZero]))
  {
    self.bridge = bridge;
    while ([self.bridge respondsToSelector:NSSelectorFromString(@"parentBridge")]
           && [self.bridge valueForKey:@"parentBridge"])
    {
      self.bridge = [self.bridge valueForKey:@"parentBridge"];
    }
  }
  
  return self;
}

- (void)dealloc
{
  if (self.scrollableView)
  {
    [self.scrollableView removeScrollListener:self];
    self.scrollableView = nil;
  }
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)


- (void)setScrollViewHandle:(NSNumber *)scrollViewHandle
{
  _scrollViewHandle = scrollViewHandle;
  
  dispatch_async(RCTGetUIManagerQueue(), ^{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry)
    {
      UIView *view = viewRegistry[scrollViewHandle];
      if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)])
      {
        if (self.scrollableView) return;
        self.scrollableView = (UIView<RCTScrollableProtocol>*)view;
        [self.scrollableView addScrollListener:self];
      }
      else
      {
        RCTLogError(@"scrollViewHandle view does not conform to RCTScrollableProtocol  %@ "
                    "with tag #%@", view, scrollViewHandle);
      }
   }];
  });

}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
  CGFloat scrollY = scrollView.contentOffset.y;
  if (scrollY >= 0)
  {
    CGFloat newOpacity = 1.0 - (scrollY / 250.0);
    if (newOpacity < 0) newOpacity = 0;
    self.alpha = newOpacity;
    self.transform = CGAffineTransformScale(CGAffineTransformIdentity, 1.0, 1.0);
  }
  else
  {
    CGFloat newScale = 1.0 + 0.4*(-scrollY / 200.0);
    if (newScale > 1.4) newScale = 1.4;
    self.alpha = 1.0;
    self.transform = CGAffineTransformScale(CGAffineTransformIdentity, newScale, newScale);
  }
}

@end
